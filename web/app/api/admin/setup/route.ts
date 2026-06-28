import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase-server';

export async function POST(request: Request) {
  try {
    const { email, password, fullName } = await request.json();

    if (!email || !password || !fullName) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
    }

    const supabase = await createAdminClient();

    // 1. Verify if any admin exists
    const { count, error: countError } = await supabase
      .from('users')
      .select('*', { count: 'exact', head: true })
      .in('role', ['admin', 'super_admin']);

    if (countError) {
      throw new Error('Database error checking existing admins.');
    }

    if (count && count > 0) {
      return NextResponse.json(
        { success: false, error: 'Administrator account already exists. Registration disabled.' },
        { status: 403 }
      );
    }

    // 2. Create the Auth User
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        full_name: fullName,
      }
    });

    if (authError || !authData.user) {
      throw new Error(authError?.message || 'Failed to create auth user.');
    }

    // 3. The `public.users` row is likely created by a trigger, but we need to update the role.
    // We update it immediately using the service role key.
    const { error: updateError } = await supabase
      .from('users')
      .update({ role: 'super_admin', full_name: fullName })
      .eq('id', authData.user.id);

    if (updateError) {
      // Note: the trigger might take a millisecond to insert.
      // A more robust way is to upsert just in case the trigger hasn't fired yet, or retry.
      const { error: upsertError } = await supabase
        .from('users')
        .upsert({
          id: authData.user.id,
          email: authData.user.email,
          full_name: fullName,
          role: 'super_admin',
          reputation_score: 0
        });

      if (upsertError) {
        throw new Error('Failed to assign super_admin role.');
      }
    }

    return NextResponse.json({ success: true, message: 'Super Admin created successfully.' });

  } catch (error: any) {
    console.error('[Admin Setup]', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
