export class DemoDashboardService {
  static getDigest(stats: any /* eslint-disable-line @typescript-eslint/no-explicit-any */) {
    return {
      title: "City Infrastructure Update",
      summary: "Significant improvements in road infrastructure reported this week. Water supply issues remain a priority in Andheri West.",
      metrics: [
        { label: "Active Issues", value: stats.totalReports - stats.resolvedReports, trend: "+5%" },
        { label: "Resolution Rate", value: "71%", trend: "+2%" },
        { label: "Community Engagement", value: "High", trend: "Stable" }
      ],
      recommendations: [
        "Monitor water logging reports in Juhu.",
        "Acknowledge recent resolved potholes in Koramangala."
      ]
    };
  }
}

export class DemoLeaderboardService {
  static getTopCitizens(users: any[] /* eslint-disable-line @typescript-eslint/no-explicit-any */) {
    return users
      .filter(u => u.role === 'citizen')
      .sort((a, b) => b.reputation_score - a.reputation_score)
      .slice(0, 10);
  }
}

export class DemoFeedService {
  static getFeed(issues: any[] /* eslint-disable-line @typescript-eslint/no-explicit-any */, filter: string = 'all') {
    if (filter === 'resolved') return issues.filter(i => i.status === 'resolved');
    if (filter === 'verified') return issues.filter(i => i.status === 'verified');
    return issues;
  }
}

export class DemoProfileService {
  static getUserStats(user: any  , issues: any[] /* eslint-disable-line @typescript-eslint/no-explicit-any */) {
    const userIssues = issues.filter(i => i.user_id === user.id);
    return {
      reportsFiled: userIssues.length,
      reportsResolved: userIssues.filter(i => i.status === 'resolved').length,
      reputationScore: user.reputation_score,
      badges: ["Early Adopter", "Active Citizen", "Community Hero"]
    };
  }
}

export class MockAIService {
  static async getIssueAnalysis(description: string) {
    // Instant mock response
    return {
      category: "Infrastructure",
      urgency: "High",
      sentiment: "Concerned",
      tags: ["Road Safety", "Immediate Attention"],
      confidence: 94
    };
  }

  static async getAdvice() {
    return "Consider organizing a local community drive to clean up the neighborhood park this weekend.";
  }
}
