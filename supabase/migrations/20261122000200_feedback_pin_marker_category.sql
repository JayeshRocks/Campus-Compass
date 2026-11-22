begin;

-- Add the category without touching the legacy feedback table or existing inbox rows.
alter table campus_feedback_v1_private.feedback_v1
  drop constraint feedback_v1_category_check,
  add constraint feedback_v1_category_check check (category in (
    'missing_place', 'incorrect_location', 'incorrect_info', 'routing_error',
    'accessibility', 'bug', 'feature_request', 'feedback', 'pin_marker'
  ));

commit;
