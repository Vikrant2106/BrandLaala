// import { finance } from "faker/lib/locales/en";

//Auth
export const emailLogin = "/user";
export const fetchAllForgotPasswordsApi = "/forgot_password";
export const validateTokenApi = "/user/validate_user_password_link";
export const setPasswordApi = "/reset_password";

//Users
export const userApi = "/user";
export const uploadUserProfileApi = "/user/upload_profile";
export const fetchAllActiveUsersApi = "/exmyb/active_users";

//Project
export const fetchAllProjectsApi = "/get_all_projects";
export const getProjectApi = "/project";
export const assignChatterToProjectApi = "/project_charter";
export const uploadProjectAttachmentApi = "/upload/project/attachment";
export const fetchReviewFeedbackApi = "/project_review";
export const updateProjectExpirationDateApi = "/project/expected_closing_date";
export const updateProjectStatusApi = "/project/change_status"; // change status api
export const getAllMilestonesApi = "/exmyb/collection/all_milestones";
export const createMilestoneApi = "/collection/milestone";
export const deleteMilestoneApi = "/collection/milestone";
export const markInvoiceUploadApi = "/collection/approval_vendor_invoice";
export const markMilestoneCompleteApi = "/collection/milestone/mark_complete";
export const markVendorPaymentRelease = "/collection/milestone/release_payment";
export const updateProjectApi = "/project";
export const updateProjectAmountApi = "/project/update_actual_amount";
export const deallocateUserFormProjectApi = "/deallocate_project";
export const allocateUserToProjectApi = "/allocate_project";
export const ticketstatusApi = "/change_support_ticket/state";
export const getAssignedUsersApi = "/project/assigned_kam";
export const projectStatusChangeApi = "project/stages";
//Proposal
export const getAllProposalsApi = "/exmyb/get_proposal_leads";
export const actiontLeadProposalApi = "/exmyb/action_project_proposal";
export const fetchProposalByLeadIdApi = "/exmyb/lead_proposals";
export const fetchProposalByProjectIdApi = "/exmyb/proposals";

//Verification
export const mobileVerificationApi = "/mobile/verify";
export const emailVerificationApi = "/email/verify";

// Chatter
export const validateSlug = "/validate_slug";
export const charterApi = "/charter";
export const searchChatterApi = "/search/charter/charter";
export const fetchProjectCharterByProjectIdApi = "/project_charter";
export const fetchProjectTimelineByProjectIdApi = "/exmyb/project_table";
export const fetchSopProjectTimelineByProjectIdApi = "/sop_table";
export const updateSopTableApi = "/sop_table";
export const assignCharterToProjectApi = "/project_charter";
export const commentsCharterApi = "/charter/comment";
export const filesCharterApi = "/charter/file_upload";
export const createProjectTimelineApi = "/project_timeline_charter";
export const updatePorjectCharterApi = "/project_charter";
export const getVendorsCharterListApi = "/vendor_charter/exmyb";
export const fetchCharterByIdApi = "/charter";
export const createNewScopeForProjectApi = "/create_project_charter";

// all Question
export const allQuestion = "/project_review_questions";
export const deleteQuestion = "/invalidate/review_question";
export const fetchQuestionDetailsById = "/project_review_questions";

// vendor
export const serachVendorApi = "/user_search/vendor";
export const assignProjectToVendorApi = "/vendor/assign_project";

// kam
export const projectMatrixApi = "/exmyb_dashboard_metrics";
export const addUser = "/user/exmyb_user";
export const fetchAllUser = "/user/get_all_exmyb_user";
export const deleteUser = "/user/exmyb_user";
export const editUser = "user/exmyb_user";

//Clients
export const reportedIssueApi = "/support/comments";
export const createSingleCommentApi = "/support/comment";

// Notifications
export const fetchAllNotificationsApi = "/get_all_user_notifications/";
export const markNotificationAsReadApi = "/mark_push_notification_as_read";
export const markAllNotificationsAsReadApi =
  "/mark_all_push_notification_as_read";

export const fetchAllSupportApi = "/support_ticket";

// --------------------- Timeline --------------------

// Project Table
export const createNewSectionApi = "/exmyb/project_table/add_new_section";
export const deleteNewSectionApi = "/exmyb/project_table/remove_section";
export const newRowApi = "/exmyb/project_table/row";
export const removeRowApi = "/exmyb/project_table/remove_row";
export const newColumnApi = "/exmyb/project_table/column";
export const removeColumnApi = "/exmyb/project_table/remove_column";
export const shiftRowApi = "/exmyb/project_table/row_shift";
export const columnShiftApi = "/exmyb/project_table/column_shift";
export const addChoiceApi = "/exmyb/project_table/column_choice/add";
export const removeChoiceApi = "/exmyb/project_table/column_choice/remove";
export const publishSectionDataApi = "/published_project_table";
export const updateSectionNameApi = "/exmyb/project_table/update_section_name";
export const purchaseOrderGetUpdateApi = "/finance/purchase_orders";
export const purchaseOrderUpdateApi = "/finance/purchase_order";

// Kanban
export const changeRowStatusApi = "/exmyb/project_table/change_row_status";
export const changeSopRowStatusApi = "/exmyb/sop_table/change_row_status";

// Gantt
export const updateStartEndDateApi =
  "/project_table/update_start_end_date/exmyb";
export const fetchAllClientSupportApi = "/exmyb/support/get_tickets_by_source";

// Collections
export const fetchAllCollectionMilestoneApi = "collection/all_milestones";
export const deleteCollectionsMilestoneApi = "collection/milestone";
export const addCollectionMileStoneApi = "collection/milestone";
export const updateCollectionsMilestoneApi = "collection/milestone";
export const fetchCollectionMilestoneByIdApi = "collection/milestone";

//AggregateCommercials
export const getAggregateCommercialMetrics =
  "/finance/get_actual_project_aggregated_data/";
export const getAggregateCommercialMetricsOld =
  "/collection/milestone/aggregate_commercials/";

//ProjectExpectations
export const getProjectExpectationMetrics =
  "/collection/milestone/project_expectation_data/";

//Delivery Internal Category
export const deliveryInternalCategory = "/project/delivery_internal_category";
export const deliveryProjectState = "/project/delivery_project_state";
export const projectChangeStatus = "project/change_status";
export const projectStatusHistoryApi = "project/status_change_history";

//Proforma Invoice
export const fetchAllProformaInvoiceApi = "/finance/performa-invoice";
export const createProformaInvoiceApi = "/finance/performa-invoice";

// finance
export const refundUserData = "/finance/create_refund";
export const clientSelectorApi = "/finance/get_all_ci";
export const vendorSelectorApi = "/finance/get_all_bill";
export const approvalCreditNotes =
  "/finance/get_all_credit_notes_and_debit_note";
export const approvalReasonApi = "/approve_credit_note_or_debit_note/";

// collections in project
export const projectCollectionApi = "/finance/get_all_actual_collection";
