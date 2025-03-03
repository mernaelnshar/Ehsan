// ReportModel.js

// نموذج ReportModel في React JavaScript
import { kSenderUid, kUidPersonReported, kSessionId, kReason, kType, kDate } from 'ehsan/core/utils/constants';

export const ReportModel = ({
  senderUid,
  uidPersonReported,
  sessionId,
  reason,
  type,
  date,
}) => ({
  senderUid,
  uidPersonReported,
  sessionId,
  reason,
  type,
  date,
});

// تحويل كائن إلى Map
export const toMap = (report) => ({
  [kSenderUid]: report.senderUid,
  [kUidPersonReported]: report.uidPersonReported,
  [kSessionId]: report.sessionId,
  [kReason]: report.reason,
  [kType]: report.type,
  [kDate]: report.date,
});

// تحويل Map إلى ReportModel
export const fromMap = (map) => ({
  senderUid: map[kSenderUid],
  uidPersonReported: map[kUidPersonReported],
  sessionId: map[kSessionId],
  reason: map[kReason],
  type: map[kType],
  date: new Date(map[kDate]),
});
