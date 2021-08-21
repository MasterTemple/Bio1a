# Canvas Student API
This is not everything that a student can do, but it is an easy reference for what I can do as a student.

## Making Requests
All you need is to just provide the `Authorization` header with `Bearer ${token}`.

Get your token from `https://${domain}/profile/settings`
![](https://cdn.discordapp.com/attachments/877643936733216788/877672323522654298/createToken.gif)

## Pagination
Use `?per_page=100` or any number between 1 and 100 to get a certain number of courses, modules, lessons, assignments, messages, and so forth. Default is 10.
> `https://${domain}/api/v1/courses/${courseId}/modules?per_page=100`

the several links are returned under the response header titled link. to get the next link use:
```js
const nextLink = response.headers.link.match(/(?<=\<)[^>]+(?=\>; rel="next")/g)[0]
```
this is necessary because you cannot just do `&page=2`

## User (Self)
### User Info
> `https://${domain}/api/v1/users/self`

Returns [User Object](#user-object)
### DashBoard
> `https://${domain}/api/v1/dashboard/dashboard_cards`

Returns an array of [Card Objects](#card-object)
### Tasks
```js
const localeDate = new Date().toISOString()
```
localeDate looks like: `2021-08-21T20:02:51.501Z`

order `asc` has newest on top, order `desc` has oldest on top
> `https://${domain}/api/v1/planner/items?start_date=${localeDate}&order=asc`

Returns an array of [Task Objects](#task-object)
### Recent Conversations
> `https://${domain}/api/v1/conversations?scope=inbox&filter_mode=and&include_private_conversation_enrollments=false`

Returns array of [Conversation Preview Objects](#conversation-preview-object)
### Single Conversations
> `https://${domain}/api/v1/conversations${conversationId}`

Returns 1 [Conversation Object](#conversation-object)
## Courses

### All User Courses
> `https://${domain}/api/v1/courses`

Returns an array of [Course Objects](#course-object)
### Specific Course
> `https://${domain}/api/v1/courses/${courseId}`

Returns one [Course Object](#course-object)

### Course Modules
> `https://${domain}/api/v1/courses/${courseId}/modules`

Returns array of [Module Objects](#module-object)

### Specific Modules
> `https://${domain}/api/v1/courses/${courseId}/modules/${moduleId}`

Returns 1 [Module Object](#module-object)

### Module Lessons (Submodule, items, tasks, assignments)
> `https://${domain}/api/v1/courses/${courseId}/modules/${moduleId}/items`

Returns array of [Lesson Objects](#lesson-object)

### Specific Lesson
> `https://${domain}/api/v1/courses/${courseId}/modules/${moduleId}/items/${itemId}`

Returns 1 [Lesson Object](#lesson-object)

### Course Assignments
> `https://${domain}/api/v1/courses/${courseId}/assignments/`

Returns an array of [Assignment Objects](#assignment-object)
### Specific Assignment
> `https://${domain}/api/v1/courses/${courseId}/assignments/${assignmentId}`

Returns 1 [Assignment Object](#assignment-object)

**Note: Assignment ID is the same as Item ID**

### Course Quizzes
> `https://${domain}/api/v1/courses/${courseId}/quizzes/`

Returns array of [Quiz Objects](#quiz-object) (not available in every course)
### Specific Quiz
> `https://${domain}/api/v1/courses/${courseId}/quizzes/${quizId}`

Returns a [Quiz Object](#quiz-object)


# Objects
## User Object
```js
{
  id: 34634,
  name: 'Blake Scampone',
  created_at: '2021-05-20T13:30:43-07:00',
  sortable_name: 'Scampone, Blake',
  short_name: 'Blake Scampone',
  avatar_url: 'https://canvas.biola.edu/images/thumbnails/4167006/Q0IkF2xvJpYWs0XTIBpdSlTmJDUBNRVzXU19najw',
  locale: null,
  effective_locale: 'en',
  permissions: {
    can_update_name: true,
    can_update_avatar: true,
    limit_parent_app_web_access: false
  }
}
```
## Card Object
```js
{
    longName: 'Fall 2021: Online Orientation - WLCM-10',
    shortName: 'Fall 2021: Online Orientation',
    originalName: 'Fall 2021: Online Orientation',
    courseCode: 'WLCM-10',
    assetString: 'course_47242',
    href: '/courses/47242',
    term: 'Extra 2021',
    subtitle: 'enrolled as: Student',
    enrollmentState: 'active',
    enrollmentType: 'StudentEnrollment',
    observee: null,
    id: 47242,
    isFavorited: false,
    isK5Subject: false,
    isHomeroom: false,
    canManage: false,
    image: null,
    color: null,
    position: null,
    published: true,
    links: [],
    canChangeCoursePublishState: false,
    defaultView: 'wiki',
    pagesUrl: 'https://biola.instructure.com/courses/47242/pages',
    frontPageTitle: 'Online Orientation Requirements'
}
```
## Task Object
```js
{
    context_type: 'Course',
    course_id: 47242,
    plannable_id: 79179,
    planner_override: null,
    plannable_type: 'quiz',
    new_activity: false,
    submissions: false,
    plannable_date: '2021-08-24T06:59:00Z',
    plannable: {
        id: 79179,
        title: 'Journal #1',
        created_at: '2021-06-25T17:58:43Z',
        updated_at: '2021-06-25T17:58:43Z',
        assignment_id: null,
        points_possible: null,
        due_at: '2021-08-24T06:59:00Z'
    },
    html_url: '/courses/47242/quizzes/79179',
    context_name: 'Fall 2021: Online Orientation',
    context_image: null
}
```
## Conversation Preview Object
```js
{
    id: 2338125,
    subject: 'Week 10',
    workflow_state: 'unread',
    last_message: 'Week 10: 16.1, 16.2\n' +
      '\n' +
      'https://cccconfer.zoom.us/rec/play/NBNWiNVifZOixr9-DxZfYXHr_PJVgQQhfYeJSqP_E...',
    last_message_at: '2021-03-15T00:03:21Z',
    last_authored_message: null,
    last_authored_message_at: null,
    message_count: 1,
    subscribed: true,
    private: false,
    starred: false,
    properties: [],
    audience: [
        2785, 134601, 116574,  45348, 10606,
        57529,  56540,   3569,  96450, 67011,
        49361, 102600,  57189,  15717, 58505,
        99424,  78860,  40414, 133136, 64242,
        35586, 109759,  74632,  93103, 45325,
        48755, 100946, 104836,  33485, 91943,
      102696, 109507,  94607,   5889
    ],
    audience_contexts: { courses: [Object], groups: {} },
    avatar_url: 'https://vcccd.instructure.com/images/messages/avatar-group-50.png',
    participants: [
      [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object],
      [Object], [Object], [Object]
    ],
    visible: true,
    context_code: 'course_33486',
    context_name: 'MATH V21C - Multivariable Calculus - 33045'
}
```
## Conversation Preview Participant Object 
```js
{
    id: 2785,
    name: 'Peter Yi',
    full_name: 'Peter Yi',
    pronouns: null
}
```
## Conversation Object
```js
{
  id: 2466679,
  subject: 'Week 17 and Final',
  workflow_state: 'read',
  last_message: 'Week 17: 17.8\n' +
    'https://cccconfer.zoom.us/rec/play/3_exKk1s7eGLQRQpb6ffaYKFxK2Jh4eZd3j4m736hgHL3YMC...',
  last_message_at: '2021-05-07T19:33:59Z',
  last_authored_message: null,
  last_authored_message_at: null,
  message_count: 1,
  subscribed: true,
  private: false,
  starred: false,
  properties: [],
  messages: [
    {
      id: 4153545,
      author_id: 2785,
      created_at: '2021-05-07T19:33:59Z',
      generated: false,
      body: 'Week 17: 17.8\n' +
        'https://cccconfer.zoom.us/rec/play/3_exKk1s7eGLQRQpb6ffaYKFxK2Jh4eZd3j4m736hgHL3YMCJqR4StJB8cN27NdkMD8NOA0VCQMp8VB8.dbDJGNQXi6bKOq3m?continueMode=true\n' +
        '\n' +
        'Zoom:  https://cccconfer.zoom.us/j/93803646046?pwd=OHhnbExjUk1RNmpLaitxN2xTcDVnZz09\n' +
        '\n' +
        'Final: Thursday, 5/13 – Monday, 5/17',
      forwarded_messages: [],
      attachments: [],
      media_comment: null,
      participating_user_ids: [Array]
    }
  ],
  submissions: [],
  audience: [
      2785, 134601, 116574,  45348,
     10606,  57529,  56540,  96450,
     67011,  49361, 102600,  57189,
     15717,  58505,  99424,  78860,
     40414, 133136,  64242, 109759,
     74632,  93103,  45325, 100946,
    104836,  33485,  91943, 109507,
     94607,   5889
  ],
  audience_contexts: { courses: { '33486': [] }, groups: {} },
  avatar_url: 'https://vcccd.instructure.com/images/messages/avatar-group-50.png',
  participants: [
    {
      id: 2785,
      name: 'Peter Yi',
      full_name: 'Peter Yi',
      pronouns: null,
      common_courses: [Object],
      common_groups: {},
      avatar_url: 'https://vcccd.instructure.com/images/messages/avatar-50.png'
    },
    //... MANY MORE 
  ],
  visible: true,
  context_name: 'MATH V21C - Multivariable Calculus - 33045',
  context_code: 'course_33486'
}
```
## Conversation Participant Object 
```js
{
    id: 2785,
    name: 'Peter Yi',
    full_name: 'Peter Yi',
    pronouns: null,
    common_courses: [Object],
    common_groups: {},
    avatar_url: 'https://vcccd.instructure.com/images/messages/avatar-50.png'
}
```
## Course Object
```js
{
    id: 34793,
    name: 'BIOL V01L - Principles of Biology Lab - 32934',
    account_id: 7,
    root_account_id: 1,
    enrollment_term_id: 121,
    uuid: 'eGQtAG5KsrBA7WiAGe0nShBQKjXV52yzd8eU6T1w',
    start_at: '2021-01-09T13:21:49Z',
    grading_standard_id: null,
    is_public: false,
    created_at: '2020-10-21T19:59:11Z',
    course_code: 'BIOL.V01L.32934',
    default_view: 'wiki',
    license: 'private',
    grade_passback_setting: null,
    end_at: null,
    public_syllabus: false,
    public_syllabus_to_auth: false,
    storage_quota_mb: 50000,
    is_public_to_auth_users: false,
    homeroom_course: false,
    course_color: null,
    apply_assignment_group_weights: false,
    calendar: {
        ics: 'https://vcccd.instructure.com/feeds/calendars/course_eGQtAG5KsrBA7WiAGe0nShBQKjXV52yzd8eU6T1w.ics'
    },
    time_zone: 'America/Los_Angeles',
    blueprint: false,
    template: false,
    enrollments: [ [Object] ],
    hide_final_grades: false,
    workflow_state: 'available',
    restrict_enrollments_to_course_dates: false,
    overridden_course_visibility: ''
}
```
```js
{ id: 33795, access_restricted_by_date: true },
```
## Module Object
```js
{
    id: 299897,
    name: '🏁 Start Here!  Welcome letter, resources, and more!',
    position: 1,
    unlock_at: null,
    require_sequential_progress: false,
    publish_final_grade: false,
    prerequisite_module_ids: [],
    items_count: 7,
    items_url: 'https://vcccd.instructure.com/api/v1/courses/34793/modules/299897/items'
},
```
## Lesson Object
```js
{
    id: 2339358,
    title: '😃 Welcome to Principles of Biology Lab Spring 2021!',
    position: 2,
    indent: 0,
    quiz_lti: false,
    type: 'Page',
    module_id: 299897,
    html_url: 'https://vcccd.instructure.com/courses/34793/modules/items/2339358',
    page_url: 'welcome-to-principles-of-biology-lab-spring-2021',
    url: 'https://vcccd.instructure.com/api/v1/courses/34793/pages/welcome-to-principles-of-biology-lab-spring-2021'
}
```
```js
{
    id: 2390584,
    title: '8.10 Enzymes & Metabolism Lab Report',
    position: 10,
    indent: 0,
    quiz_lti: false,
    type: 'Assignment',
    module_id: 305932,
    html_url: 'https://vcccd.instructure.com/courses/34793/modules/items/2390584',
    content_id: 995162,
    url: 'https://vcccd.instructure.com/api/v1/courses/34793/assignments/995162',
    completion_requirement: { type: 'must_submit' }
}
```
```js
{
    id: 2390583,
    title: '8.9 Enzyme Metabolism End of Lab Quiz',
    position: 9,
    indent: 0,
    quiz_lti: false,
    type: 'Quiz',
    module_id: 305932,
    html_url: 'https://vcccd.instructure.com/courses/34793/modules/items/2390583',
    content_id: 283972,
    url: 'https://vcccd.instructure.com/api/v1/courses/34793/quizzes/283972',
    completion_requirement: { type: 'must_submit' }
},
```
## Assignment Object
```js
{
  id: 995162,
  description: '<hr style="border: 0; border-top: 5px double #ED6E00;">\n' +
    "<h2>Upload your lab report for this week's lab!</h2>\n" +
    '<hr style="border: 0; border-top: 5px double #ED6E00;">',
  due_at: '2021-03-08T07:59:59Z',
  unlock_at: null,
  lock_at: '2021-03-15T06:59:59Z',
  points_possible: 5,
  grading_type: 'points',
  assignment_group_id: 117251,
  grading_standard_id: null,
  created_at: '2021-01-02T03:15:49Z',
  updated_at: '2021-03-14T21:19:38Z',
  peer_reviews: false,
  automatic_peer_reviews: false,
  position: 29,
  grade_group_students_individually: false,
  anonymous_peer_reviews: false,
  group_category_id: null,
  post_to_sis: false,
  moderated_grading: false,
  omit_from_final_grade: false,
  intra_group_peer_reviews: false,
  anonymous_instructor_annotations: false,
  anonymous_grading: false,
  graders_anonymous_to_graders: false,
  grader_count: 0,
  grader_comments_visible_to_graders: true,
  final_grader_id: null,
  grader_names_visible_to_final_grader: true,
  allowed_attempts: -1,
  lock_info: {
    lock_at: '2021-03-15T06:59:59Z',
    can_view: true,
    asset_string: 'assignment_995162'
  },
  secure_params: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJsdGlfYXNzaWdubWVudF9pZCI6IjM5Mjg0Y2U4LTI3YjEtNDNiYy04MWNmLWUwNWE0MGQ2ZWMxNCJ9.HELkYwJyGsq6r0gj52nJLhwt0oi0l9UFF50vrbnc0QE',
  course_id: 34793,
  name: '8.10 Enzymes & Metabolism Lab Report',
  submission_types: [ 'online_upload' ],
  has_submitted_submissions: true,
  due_date_required: false,
  max_name_length: 255,
  in_closed_grading_period: false,
  is_quiz_assignment: false,
  can_duplicate: true,
  original_course_id: null,
  original_assignment_id: null,
  original_assignment_name: null,
  original_quiz_id: null,
  workflow_state: 'published',
  important_dates: false,
  muted: true,
  html_url: 'https://vcccd.instructure.com/courses/34793/assignments/995162',
  published: true,
  only_visible_to_overrides: false,
  locked_for_user: true,
  lock_explanation: 'This assignment was locked Mar 14 at 11:59pm.',
  submissions_download_url: 'https://vcccd.instructure.com/courses/34793/assignments/995162/submissions?zip=1',
  post_manually: false,
  anonymize_students: false,
  require_lockdown_browser: false
}
```
## Quiz Object
```js
{
  id: 283972,
  title: '8.9 Enzyme Metabolism End of Lab Quiz',
  html_url: 'https://vcccd.instructure.com/courses/34793/quizzes/283972',
  mobile_url: 'https://vcccd.instructure.com/courses/34793/quizzes/283972?force_user=1&persist_headless=1',
  description: '<p>Take some time to study before you take assess what you have learned this week. You have one attempt and ten minutes. Make sure you are ready to go before you begin.</p>',
  quiz_type: 'assignment',
  time_limit: 10,
  timer_autosubmit_disabled: false,
  shuffle_answers: true,
  show_correct_answers: false,
  scoring_policy: 'keep_highest',
  allowed_attempts: 1,
  one_question_at_a_time: true,
  question_count: 8,
  points_possible: 10,
  cant_go_back: false,
  ip_filter: null,
  due_at: '2021-03-08T07:59:00Z',
  lock_at: '2021-03-12T07:59:00Z',
  unlock_at: null,
  published: true,
  locked_for_user: true,
  lock_info: {
    lock_at: '2021-03-12T07:59:00Z',
    can_view: true,
    asset_string: 'quizzes:quiz_283972'
  },
  lock_explanation: 'This quiz was locked Mar 11 at 11:59pm.',
  hide_results: null,
  show_correct_answers_at: null,
  hide_correct_answers_at: null,
  all_dates: [
    {
      due_at: '2021-03-08T07:59:00Z',
      unlock_at: null,
      lock_at: '2021-03-12T07:59:00Z',
      base: true
    }
  ],
  can_update: false,
  require_lockdown_browser: false,
  require_lockdown_browser_for_results: false,
  require_lockdown_browser_monitor: false,
  lockdown_browser_monitor_data: '',
  permissions: {
    manage: false,
    read: true,
    update: false,
    create: false,
    submit: false,
    preview: false,
    delete: false,
    read_statistics: false,
    grade: false,
    review_grades: false,
    view_answer_audits: false
  },
  quiz_reports_url: 'https://vcccd.instructure.com/api/v1/courses/34793/quizzes/283972/reports',
  quiz_statistics_url: 'https://vcccd.instructure.com/api/v1/courses/34793/quizzes/283972/statistics',
  important_dates: false,
  quiz_submission_versions_html_url: 'https://vcccd.instructure.com/courses/34793/quizzes/283972/submission_versions',
  assignment_id: 995160,
  one_time_results: false,
  assignment_group_id: 117251,
  show_correct_answers_last_attempt: false,
  version_number: 7,
  has_access_code: false,
  post_to_sis: false,
  migration_id: 'ibd7b71b93093c3e444bdef0d8acb3797',
  question_types: [ 'multiple_choice_question', 'essay_question' ]
}
```