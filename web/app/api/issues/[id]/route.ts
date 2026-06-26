import { NextResponse } from 'next/server';
import { getIssueById, updateIssue, deleteIssue } from '@/services/issues';
import { getAuthContext } from '@/services/auth';
import { uuidSchema, updateIssueSchema, formatZodError } from '@/lib/validations';
import { logger } from '@/lib/logger';

/**
 * GET handler to strictly retrieve a single issue by its UUID.
 * 
 * @param request The incoming Next.js HTTP Request object
 * @param params Dynamic route parameters containing the 'id'
 */
export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;

    const idValidation = uuidSchema.safeParse(id);
    if (!idValidation.success) {
      return NextResponse.json(
        { success: false, error: 'Bad Request', message: 'A valid issue ID is required.' },
        { status: 400 }
      );
    }

    const issue = await getIssueById(idValidation.data);

    if (!issue) {
      return NextResponse.json(
        { success: false, error: 'Not Found', message: 'Issue not found.' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Issue retrieved successfully.',
      data: issue
    });

  } catch (error: unknown) {
    logger.error({
      category: 'SYSTEM',
      message: '[Issues ID API GET] Unhandled exception',
      error
    });
    return NextResponse.json(
      { success: false, error: 'Internal Server Error', message: 'An unexpected server error occurred while retrieving the issue.' },
      { status: 500 }
    );
  }
}

/**
 * PATCH handler to securely update a specific issue.
 * 
 * Expected JSON payload:
 * {
 *   "title": "string",
 *   "description": "string",
 *   "status": "string", (Admin only)
 *   "severity": "string",
 *   "category": "string",
 *   "department": "string",
 *   "locationName": "string"
 * }
 */
export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;

    const idValidation = uuidSchema.safeParse(id);
    if (!idValidation.success) {
      return NextResponse.json(
        { success: false, error: 'Bad Request', message: 'A valid issue ID is required.' },
        { status: 400 }
      );
    }

    // 1. Resolve Auth Context natively
    const context = await getAuthContext();
    if (!context.isAuthenticated || !context.user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized', message: 'You must be logged in to modify an issue.' },
        { status: 401 }
      );
    }

    // 2. Parse Payload
    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, error: 'Bad Request', message: 'Malformed JSON payload.' },
        { status: 400 }
      );
    }

    // 3. Strict Payload Validation
    const validationResult = updateIssueSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { success: false, error: 'Bad Request', message: formatZodError(validationResult.error) },
        { status: 400 }
      );
    }

    // 4. Delegate to Service Layer (which enforces owner/admin RBAC natively)
    try {
      const success = await updateIssue(idValidation.data, context.user.id, context.isAdmin, validationResult.data);

      if (!success) {
        return NextResponse.json(
          { success: false, error: 'Update Failed', message: 'The database failed to apply updates.' },
          { status: 500 }
        );
      }
    } catch (serviceErr: unknown) {
      const msg = serviceErr instanceof Error ? serviceErr.message : 'Service error';
      if (msg.includes('Unauthorized')) {
        return NextResponse.json(
          { success: false, error: 'Forbidden', message: msg },
          { status: 403 }
        );
      }
      throw serviceErr; // Bubble to generic 500
    }

    // 4. Return strictly typed success
    return NextResponse.json({
      success: true,
      message: 'Issue updated successfully.'
    });

  } catch (error: unknown) {
    logger.error({
      category: 'SYSTEM',
      message: '[Issues ID API PATCH] Unhandled exception',
      error
    });
    return NextResponse.json(
      { success: false, error: 'Internal Server Error', message: 'An unexpected server error occurred while updating the issue.' },
      { status: 500 }
    );
  }
}

/**
 * DELETE handler to safely hard-delete a civic issue.
 */
export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;

    const idValidation = uuidSchema.safeParse(id);
    if (!idValidation.success) {
      return NextResponse.json(
        { success: false, error: 'Bad Request', message: 'A valid issue ID is required.' },
        { status: 400 }
      );
    }

    // 1. Resolve Auth Context natively
    const context = await getAuthContext();
    if (!context.isAuthenticated || !context.user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized', message: 'You must be logged in to delete an issue.' },
        { status: 401 }
      );
    }

    // 2. Delegate to Service Layer (which enforces owner/admin RBAC natively)
    try {
      const success = await deleteIssue(idValidation.data, context.user.id, context.isAdmin);

      if (!success) {
        return NextResponse.json(
          { success: false, error: 'Delete Failed', message: 'The database failed to execute delete.' },
          { status: 500 }
        );
      }
    } catch (serviceErr: unknown) {
      const msg = serviceErr instanceof Error ? serviceErr.message : 'Service error';
      if (msg.includes('Unauthorized')) {
        return NextResponse.json(
          { success: false, error: 'Forbidden', message: msg },
          { status: 403 }
        );
      }
      throw serviceErr; // Bubble to generic 500
    }

    // 3. Return strictly typed success
    return NextResponse.json({
      success: true,
      message: 'Issue deleted successfully.'
    });

  } catch (error: unknown) {
    logger.error({
      category: 'SYSTEM',
      message: '[Issues ID API DELETE] Unhandled exception',
      error
    });
    return NextResponse.json(
      { success: false, error: 'Internal Server Error', message: 'An unexpected server error occurred while deleting the issue.' },
      { status: 500 }
    );
  }
}
