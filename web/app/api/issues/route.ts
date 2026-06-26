import { NextResponse } from 'next/server';
import { getIssues, createIssue } from '@/services/issues';
import { getAuthContext } from '@/services/auth';
import { getIssuesQuerySchema, createIssueSchema, formatZodError } from '@/lib/validations';
import { logger } from '@/lib/logger';

/**
 * GET handler to securely fetch a paginated, aggressively filtered list of issues.
 * Supports a robust set of query parameters for the main CivicMind feed.
 * 
 * @param request The incoming Next.js HTTP Request object
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    // 1. Defensively parse and validate query parameters using Zod
    const queryParams = Object.fromEntries(searchParams.entries());
    const validationResult = getIssuesQuerySchema.safeParse(queryParams);
    
    if (!validationResult.success) {
      return NextResponse.json(
        { success: false, error: 'Bad Request', message: formatZodError(validationResult.error) },
        { status: 400 }
      );
    }

    const options = validationResult.data;

    // 2. Execute business logic cleanly in the service layer
    const result = await getIssues(options);

    // 3. Construct and return successful JSON payload
    return NextResponse.json({
      success: true,
      message: 'Issues retrieved successfully.',
      data: {
        pagination: {
          page: options.page,
          limit: options.limit,
          total: result.count
        },
        issues: result.issues
      }
    });

  } catch (error: unknown) {
    logger.error({
      category: 'SYSTEM',
      message: '[Issues API GET] Unhandled exception',
      error
    });
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal Server Error',
        message: 'An unexpected server error occurred while retrieving issues.' 
      },
      { status: 500 }
    );
  }
}

/**
 * POST handler to securely create a new CivicMind issue.
 * 
 * Expected JSON payload:
 * {
 *   "title": "string",
 *   "description": "string",
 *   "category": "string",
 *   "severity": "string",
 *   "department": "string",
 *   "imageUrl": "string",
 *   "latitude": number,
 *   "longitude": number,
 *   "locationName": "string"
 * }
 */
export async function POST(request: Request) {
  try {
    // 1. Resolve Auth Context natively
    const context = await getAuthContext();
    if (!context.isAuthenticated || !context.user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized', message: 'You must be logged in to report an issue.' },
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

    // 3. Strict Top-level API Validation using Zod
    const validationResult = createIssueSchema.safeParse(body);
    
    if (!validationResult.success) {
      return NextResponse.json(
        { success: false, error: 'Unprocessable Entity', message: formatZodError(validationResult.error) },
        { status: 422 }
      );
    }

    // 4. Delegate to Service Layer
    const result = await createIssue({
      ...validationResult.data,
      userId: context.user.id
    });

    // 5. Return strictly typed success
    return NextResponse.json({
      success: true,
      message: 'Issue created successfully.',
      data: result
    });

  } catch (error: unknown) {
    logger.error({
      category: 'SYSTEM',
      message: '[Issues API POST] Unhandled exception',
      error
    });
    
    // Check if the service threw a specific Validation Error
    if (error instanceof Error && error.message.includes('Validation Error')) {
      return NextResponse.json(
        { success: false, error: 'Bad Request', message: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal Server Error',
        message: 'An unexpected server error occurred while creating the issue.' 
      },
      { status: 500 }
    );
  }
}
