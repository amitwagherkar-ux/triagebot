// Pre-loaded Model Runs and Sample Evaluations
window.PRELOADED_RUNS = [
  {
    run_id: 'run_hist_v1',
    model_name: 'Claude 3.5 Sonnet',
    prompt_version: 'v1.0 Baseline (Zero-Shot)',
    dataset_target: 'HISTORICAL',
    created_at: '2026-10-05T10:00:00Z',
    description: 'Initial prompt relying largely on ticket title and surface symptoms. Demonstrates common keyword & symptom traps.',
    results: [
    {
        "ticket_id":  "EN-12896",
        "classification":  "Bug",
        "confidence":  0.79,
        "reason":  "Observed behavior shows operation cannot be completed; potential regression in workflow.",
        "evidence":  "- User blocked from updating configuration values\n- System throws error during save",
        "recommended_action":  "Check API endpoint error responses and reproduction environment.",
        "suggested_owner":  "Aditya Patle",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EA-14473",
        "classification":  "Config",
        "confidence":  0.75,
        "reason":  "The required capability is supported in the product; setup or account configuration prevents expected outcome.",
        "evidence":  "- Product module already supports target workflow\n- Account or parameter configuration check required",
        "recommended_action":  "Verify existing feature permissions and center-level configuration parameters.",
        "suggested_owner":  "Aditya Patle",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EA-14542",
        "classification":  "Config",
        "confidence":  0.76,
        "reason":  "The required capability is supported in the product; setup or account configuration prevents expected outcome.",
        "evidence":  "- Product module already supports target workflow\n- Account or parameter configuration check required",
        "recommended_action":  "Verify existing feature permissions and center-level configuration parameters.",
        "suggested_owner":  "Milind",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EA-14489",
        "classification":  "Bug",
        "confidence":  0.89,
        "reason":  "Reported behavior violates existing documented functionality and expected system behavior.",
        "evidence":  "- Existing workflow produces incorrect outcome\n- Mismatch between expected and actual data state",
        "recommended_action":  "Reproduce and compare expected vs actual behavior in test environment.",
        "suggested_owner":  "Milind",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EN-12559",
        "classification":  "Bug",
        "confidence":  0.76,
        "reason":  "Reported behavior violates existing documented functionality and expected system behavior.",
        "evidence":  "- Existing workflow produces incorrect outcome\n- Mismatch between expected and actual data state",
        "recommended_action":  "Reproduce and compare expected vs actual behavior in test environment.",
        "suggested_owner":  "Mohammad Ashfaque",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EA-14632",
        "classification":  "Config",
        "confidence":  0.77,
        "reason":  "The required capability is supported in the product; setup or account configuration prevents expected outcome.",
        "evidence":  "- Product module already supports target workflow\n- Account or parameter configuration check required",
        "recommended_action":  "Verify existing feature permissions and center-level configuration parameters.",
        "suggested_owner":  "Nilesh",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EN-12915",
        "classification":  "Change Request",
        "confidence":  0.84,
        "reason":  "Ticket requests new capability or intentional alteration to existing system behavior.",
        "evidence":  "- Requested capability is currently absent from product scope\n- Requires architectural and functional scoping",
        "recommended_action":  "Validate desired functional scope and conduct engineering feasibility assessment.",
        "suggested_owner":  "Nilesh",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EA-14548",
        "classification":  "Bug",
        "confidence":  0.81,
        "reason":  "Reported behavior violates existing documented functionality and expected system behavior.",
        "evidence":  "- Existing workflow produces incorrect outcome\n- Mismatch between expected and actual data state",
        "recommended_action":  "Reproduce and compare expected vs actual behavior in test environment.",
        "suggested_owner":  "Nilesh",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EA-14474",
        "classification":  "Bug",
        "confidence":  0.84,
        "reason":  "Reported behavior violates existing documented functionality and expected system behavior.",
        "evidence":  "- Existing workflow produces incorrect outcome\n- Mismatch between expected and actual data state",
        "recommended_action":  "Reproduce and compare expected vs actual behavior in test environment.",
        "suggested_owner":  "Nilesh",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EN-12869",
        "classification":  "Bug",
        "confidence":  0.91,
        "reason":  "Reported behavior violates existing documented functionality and expected system behavior.",
        "evidence":  "- Existing workflow produces incorrect outcome\n- Mismatch between expected and actual data state",
        "recommended_action":  "Reproduce and compare expected vs actual behavior in test environment.",
        "suggested_owner":  "Rasul",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EA-14463",
        "classification":  "Bug",
        "confidence":  0.81,
        "reason":  "Reported behavior violates existing documented functionality and expected system behavior.",
        "evidence":  "- Existing workflow produces incorrect outcome\n- Mismatch between expected and actual data state",
        "recommended_action":  "Reproduce and compare expected vs actual behavior in test environment.",
        "suggested_owner":  "shubham",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EA-14485",
        "classification":  "Bug",
        "confidence":  0.74,
        "reason":  "Reported behavior violates existing documented functionality and expected system behavior.",
        "evidence":  "- Existing workflow produces incorrect outcome\n- Mismatch between expected and actual data state",
        "recommended_action":  "Reproduce and compare expected vs actual behavior in test environment.",
        "suggested_owner":  "Sumit",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EN-12847",
        "classification":  "Needs Manual Triage",
        "confidence":  0.52,
        "reason":  "Reported QR scan failure lacks device reproduction logs, lighting details, and mobile client version.",
        "evidence":  "- Insufficient reproduction evidence\n- Expected vs actual camera scanner behavior undetermined",
        "recommended_action":  "Request camera model, QR raw payload, and client app logs from reporter.",
        "suggested_owner":  "Aditya Patle",
        "human_review":  "Required"
    },
    {
        "ticket_id":  "EA-14500",
        "classification":  "Config",
        "confidence":  0.73,
        "reason":  "The required capability is supported in the product; setup or account configuration prevents expected outcome.",
        "evidence":  "- Product module already supports target workflow\n- Account or parameter configuration check required",
        "recommended_action":  "Verify existing feature permissions and center-level configuration parameters.",
        "suggested_owner":  "Aditya Patle",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EA-14529",
        "classification":  "Bug",
        "confidence":  0.75,
        "reason":  "Reported behavior violates existing documented functionality and expected system behavior.",
        "evidence":  "- Existing workflow produces incorrect outcome\n- Mismatch between expected and actual data state",
        "recommended_action":  "Reproduce and compare expected vs actual behavior in test environment.",
        "suggested_owner":  "Aman",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EA-14480",
        "classification":  "Bug",
        "confidence":  0.84,
        "reason":  "Failure in notification triggering mechanism; outbound message event failed to dispatch.",
        "evidence":  "- WhatsApp notification missing for patients\n- Trigger service appears non-operational",
        "recommended_action":  "Inspect notification worker logs and dead letter queues.",
        "suggested_owner":  "Hasan",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EA-14496",
        "classification":  "Bug",
        "confidence":  0.76,
        "reason":  "Reported behavior violates existing documented functionality and expected system behavior.",
        "evidence":  "- Existing workflow produces incorrect outcome\n- Mismatch between expected and actual data state",
        "recommended_action":  "Reproduce and compare expected vs actual behavior in test environment.",
        "suggested_owner":  "Hasan",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EA-14466",
        "classification":  "Change Request",
        "confidence":  0.79,
        "reason":  "Ticket requests new capability or intentional alteration to existing system behavior.",
        "evidence":  "- Requested capability is currently absent from product scope\n- Requires architectural and functional scoping",
        "recommended_action":  "Validate desired functional scope and conduct engineering feasibility assessment.",
        "suggested_owner":  "Hasan",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EA-14479",
        "classification":  "Bug",
        "confidence":  0.91,
        "reason":  "Reported behavior violates existing documented functionality and expected system behavior.",
        "evidence":  "- Existing workflow produces incorrect outcome\n- Mismatch between expected and actual data state",
        "recommended_action":  "Reproduce and compare expected vs actual behavior in test environment.",
        "suggested_owner":  "Joash",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EA-14168",
        "classification":  "Bug",
        "confidence":  0.84,
        "reason":  "Reported behavior violates existing documented functionality and expected system behavior.",
        "evidence":  "- Existing workflow produces incorrect outcome\n- Mismatch between expected and actual data state",
        "recommended_action":  "Reproduce and compare expected vs actual behavior in test environment.",
        "suggested_owner":  "Joash",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EN-12890",
        "classification":  "Bug",
        "confidence":  0.89,
        "reason":  "Reported behavior violates existing documented functionality and expected system behavior.",
        "evidence":  "- Existing workflow produces incorrect outcome\n- Mismatch between expected and actual data state",
        "recommended_action":  "Reproduce and compare expected vs actual behavior in test environment.",
        "suggested_owner":  "Milind",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EN-12850",
        "classification":  "Bug",
        "confidence":  0.75,
        "reason":  "Reported behavior violates existing documented functionality and expected system behavior.",
        "evidence":  "- Existing workflow produces incorrect outcome\n- Mismatch between expected and actual data state",
        "recommended_action":  "Reproduce and compare expected vs actual behavior in test environment.",
        "suggested_owner":  "Milind",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EA-14491",
        "classification":  "Bug",
        "confidence":  0.73,
        "reason":  "Reported behavior violates existing documented functionality and expected system behavior.",
        "evidence":  "- Existing workflow produces incorrect outcome\n- Mismatch between expected and actual data state",
        "recommended_action":  "Reproduce and compare expected vs actual behavior in test environment.",
        "suggested_owner":  "Milind",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EN-12863",
        "classification":  "Bug",
        "confidence":  0.86,
        "reason":  "Reported behavior violates existing documented functionality and expected system behavior.",
        "evidence":  "- Existing workflow produces incorrect outcome\n- Mismatch between expected and actual data state",
        "recommended_action":  "Reproduce and compare expected vs actual behavior in test environment.",
        "suggested_owner":  "Mohammad Ashfaque",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EA-14515",
        "classification":  "Bug",
        "confidence":  0.78,
        "reason":  "Reported behavior violates existing documented functionality and expected system behavior.",
        "evidence":  "- Existing workflow produces incorrect outcome\n- Mismatch between expected and actual data state",
        "recommended_action":  "Reproduce and compare expected vs actual behavior in test environment.",
        "suggested_owner":  "Mohammad Ashfaque",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EA-14464",
        "classification":  "Bug",
        "confidence":  0.79,
        "reason":  "Reported behavior violates existing documented functionality and expected system behavior.",
        "evidence":  "- Existing workflow produces incorrect outcome\n- Mismatch between expected and actual data state",
        "recommended_action":  "Reproduce and compare expected vs actual behavior in test environment.",
        "suggested_owner":  "Mohammad Ashfaque",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EA-14357",
        "classification":  "Change Request",
        "confidence":  0.75,
        "reason":  "Ticket requests new capability or intentional alteration to existing system behavior.",
        "evidence":  "- Requested capability is currently absent from product scope\n- Requires architectural and functional scoping",
        "recommended_action":  "Validate desired functional scope and conduct engineering feasibility assessment.",
        "suggested_owner":  "Nilesh",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EA-14167",
        "classification":  "Bug",
        "confidence":  0.86,
        "reason":  "Reported behavior violates existing documented functionality and expected system behavior.",
        "evidence":  "- Existing workflow produces incorrect outcome\n- Mismatch between expected and actual data state",
        "recommended_action":  "Reproduce and compare expected vs actual behavior in test environment.",
        "suggested_owner":  "Nilesh",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EA-14539",
        "classification":  "Bug",
        "confidence":  0.82,
        "reason":  "UI displays success message when pre-condition (inventory mapped) is violated.",
        "evidence":  "- Incorrect success banner reported\n- Misleading workflow state",
        "recommended_action":  "Add validation guard before triggering success toast.",
        "suggested_owner":  "Pragati",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EA-14492",
        "classification":  "Config",
        "confidence":  0.88,
        "reason":  "The required capability is supported in the product; setup or account configuration prevents expected outcome.",
        "evidence":  "- Product module already supports target workflow\n- Account or parameter configuration check required",
        "recommended_action":  "Verify existing feature permissions and center-level configuration parameters.",
        "suggested_owner":  "Pragati",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EA-14406",
        "classification":  "Change Request",
        "confidence":  0.77,
        "reason":  "Ticket requests new capability or intentional alteration to existing system behavior.",
        "evidence":  "- Requested capability is currently absent from product scope\n- Requires architectural and functional scoping",
        "recommended_action":  "Validate desired functional scope and conduct engineering feasibility assessment.",
        "suggested_owner":  "Pragati",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EA-14366",
        "classification":  "Bug",
        "confidence":  0.8,
        "reason":  "Reported behavior violates existing documented functionality and expected system behavior.",
        "evidence":  "- Existing workflow produces incorrect outcome\n- Mismatch between expected and actual data state",
        "recommended_action":  "Reproduce and compare expected vs actual behavior in test environment.",
        "suggested_owner":  "Pragati",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EA-14534",
        "classification":  "Bug",
        "confidence":  0.74,
        "reason":  "Reported behavior violates existing documented functionality and expected system behavior.",
        "evidence":  "- Existing workflow produces incorrect outcome\n- Mismatch between expected and actual data state",
        "recommended_action":  "Reproduce and compare expected vs actual behavior in test environment.",
        "suggested_owner":  "Rahul",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EA-14488",
        "classification":  "Bug",
        "confidence":  0.74,
        "reason":  "Reported behavior violates existing documented functionality and expected system behavior.",
        "evidence":  "- Existing workflow produces incorrect outcome\n- Mismatch between expected and actual data state",
        "recommended_action":  "Reproduce and compare expected vs actual behavior in test environment.",
        "suggested_owner":  "Rahul",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EN-12883",
        "classification":  "Bug",
        "confidence":  0.72,
        "reason":  "Reported behavior violates existing documented functionality and expected system behavior.",
        "evidence":  "- Existing workflow produces incorrect outcome\n- Mismatch between expected and actual data state",
        "recommended_action":  "Reproduce and compare expected vs actual behavior in test environment.",
        "suggested_owner":  "Rahul",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EN-12878",
        "classification":  "Change Request",
        "confidence":  0.82,
        "reason":  "Ticket requests new capability or intentional alteration to existing system behavior.",
        "evidence":  "- Requested capability is currently absent from product scope\n- Requires architectural and functional scoping",
        "recommended_action":  "Validate desired functional scope and conduct engineering feasibility assessment.",
        "suggested_owner":  "Rohit Rasam",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EA-14460",
        "classification":  "Bug",
        "confidence":  0.83,
        "reason":  "Reported behavior violates existing documented functionality and expected system behavior.",
        "evidence":  "- Existing workflow produces incorrect outcome\n- Mismatch between expected and actual data state",
        "recommended_action":  "Reproduce and compare expected vs actual behavior in test environment.",
        "suggested_owner":  "Rohit Rasam",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EA-14454",
        "classification":  "Change Request",
        "confidence":  0.91,
        "reason":  "Ticket requests new capability or intentional alteration to existing system behavior.",
        "evidence":  "- Requested capability is currently absent from product scope\n- Requires architectural and functional scoping",
        "recommended_action":  "Validate desired functional scope and conduct engineering feasibility assessment.",
        "suggested_owner":  "Rucha",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EA-14538",
        "classification":  "Config",
        "confidence":  0.72,
        "reason":  "The required capability is supported in the product; setup or account configuration prevents expected outcome.",
        "evidence":  "- Product module already supports target workflow\n- Account or parameter configuration check required",
        "recommended_action":  "Verify existing feature permissions and center-level configuration parameters.",
        "suggested_owner":  "shubham",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EA-14456",
        "classification":  "Bug",
        "confidence":  0.87,
        "reason":  "Reported behavior violates existing documented functionality and expected system behavior.",
        "evidence":  "- Existing workflow produces incorrect outcome\n- Mismatch between expected and actual data state",
        "recommended_action":  "Reproduce and compare expected vs actual behavior in test environment.",
        "suggested_owner":  "shubham",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EA-14504",
        "classification":  "Change Request",
        "confidence":  0.93,
        "reason":  "Ticket requests new capability or intentional alteration to existing system behavior.",
        "evidence":  "- Requested capability is currently absent from product scope\n- Requires architectural and functional scoping",
        "recommended_action":  "Validate desired functional scope and conduct engineering feasibility assessment.",
        "suggested_owner":  "Somnath",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EA-14446",
        "classification":  "Change Request",
        "confidence":  0.83,
        "reason":  "Ticket requests new capability or intentional alteration to existing system behavior.",
        "evidence":  "- Requested capability is currently absent from product scope\n- Requires architectural and functional scoping",
        "recommended_action":  "Validate desired functional scope and conduct engineering feasibility assessment.",
        "suggested_owner":  "Somnath",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EA-14537",
        "classification":  "Bug",
        "confidence":  0.86,
        "reason":  "Reported behavior violates existing documented functionality and expected system behavior.",
        "evidence":  "- Existing workflow produces incorrect outcome\n- Mismatch between expected and actual data state",
        "recommended_action":  "Reproduce and compare expected vs actual behavior in test environment.",
        "suggested_owner":  "Sumit",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EN-12849",
        "classification":  "Bug",
        "confidence":  0.81,
        "reason":  "Reported behavior violates existing documented functionality and expected system behavior.",
        "evidence":  "- Existing workflow produces incorrect outcome\n- Mismatch between expected and actual data state",
        "recommended_action":  "Reproduce and compare expected vs actual behavior in test environment.",
        "suggested_owner":  "Tanmay",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EA-14518",
        "classification":  "Bug",
        "confidence":  0.82,
        "reason":  "Reported behavior violates existing documented functionality and expected system behavior.",
        "evidence":  "- Existing workflow produces incorrect outcome\n- Mismatch between expected and actual data state",
        "recommended_action":  "Reproduce and compare expected vs actual behavior in test environment.",
        "suggested_owner":  "Tanmay",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EA-14523",
        "classification":  "Bug",
        "confidence":  0.88,
        "reason":  "Ticket reports duplicate PO numbers being generated, which indicates violation of unique sequence constraint.",
        "evidence":  "- Summary states duplicate PO numbers generated\n- Observed behavior deviates from expected unique generation",
        "recommended_action":  "Reproduce in inventory service and check sequence generator.",
        "suggested_owner":  "Tanmay",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EA-14524",
        "classification":  "Config",
        "confidence":  0.79,
        "reason":  "The required capability is supported in the product; setup or account configuration prevents expected outcome.",
        "evidence":  "- Product module already supports target workflow\n- Account or parameter configuration check required",
        "recommended_action":  "Verify existing feature permissions and center-level configuration parameters.",
        "suggested_owner":  "Tanmay",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EA-14484",
        "classification":  "Change Request",
        "confidence":  0.85,
        "reason":  "Ticket requests new capability or intentional alteration to existing system behavior.",
        "evidence":  "- Requested capability is currently absent from product scope\n- Requires architectural and functional scoping",
        "recommended_action":  "Validate desired functional scope and conduct engineering feasibility assessment.",
        "suggested_owner":  "Joash",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EA-14505",
        "classification":  "Change Request",
        "confidence":  0.72,
        "reason":  "Ticket requests new capability or intentional alteration to existing system behavior.",
        "evidence":  "- Requested capability is currently absent from product scope\n- Requires architectural and functional scoping",
        "recommended_action":  "Validate desired functional scope and conduct engineering feasibility assessment.",
        "suggested_owner":  "Rahul",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EA-14482",
        "classification":  "Change Request",
        "confidence":  0.94,
        "reason":  "Ticket requests new capability or intentional alteration to existing system behavior.",
        "evidence":  "- Requested capability is currently absent from product scope\n- Requires architectural and functional scoping",
        "recommended_action":  "Validate desired functional scope and conduct engineering feasibility assessment.",
        "suggested_owner":  "Rohit Rasam",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EA-14522",
        "classification":  "Bug",
        "confidence":  0.88,
        "reason":  "Reported behavior violates existing documented functionality and expected system behavior.",
        "evidence":  "- Existing workflow produces incorrect outcome\n- Mismatch between expected and actual data state",
        "recommended_action":  "Reproduce and compare expected vs actual behavior in test environment.",
        "suggested_owner":  "Rohit Rasam",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EN-12007",
        "classification":  "Change Request",
        "confidence":  0.74,
        "reason":  "Ticket requests new capability or intentional alteration to existing system behavior.",
        "evidence":  "- Requested capability is currently absent from product scope\n- Requires architectural and functional scoping",
        "recommended_action":  "Validate desired functional scope and conduct engineering feasibility assessment.",
        "suggested_owner":  "Sachin",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EA-14493",
        "classification":  "Change Request",
        "confidence":  0.8,
        "reason":  "Ticket requests new capability or intentional alteration to existing system behavior.",
        "evidence":  "- Requested capability is currently absent from product scope\n- Requires architectural and functional scoping",
        "recommended_action":  "Validate desired functional scope and conduct engineering feasibility assessment.",
        "suggested_owner":  "Sumit",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EA-14647",
        "classification":  "Bug",
        "confidence":  0.75,
        "reason":  "Reported behavior violates existing documented functionality and expected system behavior.",
        "evidence":  "- Existing workflow produces incorrect outcome\n- Mismatch between expected and actual data state",
        "recommended_action":  "Reproduce and compare expected vs actual behavior in test environment.",
        "suggested_owner":  "Aakash",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EA-14658",
        "classification":  "Bug",
        "confidence":  0.77,
        "reason":  "Reported behavior violates existing documented functionality and expected system behavior.",
        "evidence":  "- Existing workflow produces incorrect outcome\n- Mismatch between expected and actual data state",
        "recommended_action":  "Reproduce and compare expected vs actual behavior in test environment.",
        "suggested_owner":  "Akshay",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EA-14683",
        "classification":  "Bug",
        "confidence":  0.84,
        "reason":  "Reported behavior violates existing documented functionality and expected system behavior.",
        "evidence":  "- Existing workflow produces incorrect outcome\n- Mismatch between expected and actual data state",
        "recommended_action":  "Reproduce and compare expected vs actual behavior in test environment.",
        "suggested_owner":  "Aman",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EA-14665",
        "classification":  "Bug",
        "confidence":  0.9,
        "reason":  "Reported behavior violates existing documented functionality and expected system behavior.",
        "evidence":  "- Existing workflow produces incorrect outcome\n- Mismatch between expected and actual data state",
        "recommended_action":  "Reproduce and compare expected vs actual behavior in test environment.",
        "suggested_owner":  "Laksh",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EN-12988",
        "classification":  "Change Request",
        "confidence":  0.88,
        "reason":  "Ticket requests new capability or intentional alteration to existing system behavior.",
        "evidence":  "- Requested capability is currently absent from product scope\n- Requires architectural and functional scoping",
        "recommended_action":  "Validate desired functional scope and conduct engineering feasibility assessment.",
        "suggested_owner":  "Milind",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EA-14655",
        "classification":  "Bug",
        "confidence":  0.85,
        "reason":  "Reported behavior violates existing documented functionality and expected system behavior.",
        "evidence":  "- Existing workflow produces incorrect outcome\n- Mismatch between expected and actual data state",
        "recommended_action":  "Reproduce and compare expected vs actual behavior in test environment.",
        "suggested_owner":  "Milind",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EN-12984",
        "classification":  "Change Request",
        "confidence":  0.87,
        "reason":  "Ticket requests new capability or intentional alteration to existing system behavior.",
        "evidence":  "- Requested capability is currently absent from product scope\n- Requires architectural and functional scoping",
        "recommended_action":  "Validate desired functional scope and conduct engineering feasibility assessment.",
        "suggested_owner":  "Nilesh",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EN-13014",
        "classification":  "Bug",
        "confidence":  0.8,
        "reason":  "Reported behavior violates existing documented functionality and expected system behavior.",
        "evidence":  "- Existing workflow produces incorrect outcome\n- Mismatch between expected and actual data state",
        "recommended_action":  "Reproduce and compare expected vs actual behavior in test environment.",
        "suggested_owner":  "Rahul",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EN-12982",
        "classification":  "Config",
        "confidence":  0.73,
        "reason":  "The required capability is supported in the product; setup or account configuration prevents expected outcome.",
        "evidence":  "- Product module already supports target workflow\n- Account or parameter configuration check required",
        "recommended_action":  "Verify existing feature permissions and center-level configuration parameters.",
        "suggested_owner":  "Rahul",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EA-14659",
        "classification":  "Config",
        "confidence":  0.78,
        "reason":  "The required capability is supported in the product; setup or account configuration prevents expected outcome.",
        "evidence":  "- Product module already supports target workflow\n- Account or parameter configuration check required",
        "recommended_action":  "Verify existing feature permissions and center-level configuration parameters.",
        "suggested_owner":  "Rasul Sayyed",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EA-14610",
        "classification":  "Bug",
        "confidence":  0.77,
        "reason":  "Reported behavior violates existing documented functionality and expected system behavior.",
        "evidence":  "- Existing workflow produces incorrect outcome\n- Mismatch between expected and actual data state",
        "recommended_action":  "Reproduce and compare expected vs actual behavior in test environment.",
        "suggested_owner":  "shubham",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EA-14591",
        "classification":  "Bug",
        "confidence":  0.82,
        "reason":  "Reported behavior violates existing documented functionality and expected system behavior.",
        "evidence":  "- Existing workflow produces incorrect outcome\n- Mismatch between expected and actual data state",
        "recommended_action":  "Reproduce and compare expected vs actual behavior in test environment.",
        "suggested_owner":  "shubham",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EN-12987",
        "classification":  "Change Request",
        "confidence":  0.95,
        "reason":  "Ticket requests new capability or intentional alteration to existing system behavior.",
        "evidence":  "- Requested capability is currently absent from product scope\n- Requires architectural and functional scoping",
        "recommended_action":  "Validate desired functional scope and conduct engineering feasibility assessment.",
        "suggested_owner":  "Sumit",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EN-12983",
        "classification":  "Change Request",
        "confidence":  0.74,
        "reason":  "Ticket requests new capability or intentional alteration to existing system behavior.",
        "evidence":  "- Requested capability is currently absent from product scope\n- Requires architectural and functional scoping",
        "recommended_action":  "Validate desired functional scope and conduct engineering feasibility assessment.",
        "suggested_owner":  "Yogesh Wagh",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EN-13044",
        "classification":  "Change Request",
        "confidence":  0.79,
        "reason":  "Ticket requests new capability or intentional alteration to existing system behavior.",
        "evidence":  "- Requested capability is currently absent from product scope\n- Requires architectural and functional scoping",
        "recommended_action":  "Validate desired functional scope and conduct engineering feasibility assessment.",
        "suggested_owner":  "Yogesh Wagh",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EA-14640",
        "classification":  "Change Request",
        "confidence":  0.91,
        "reason":  "Ticket requests new capability or intentional alteration to existing system behavior.",
        "evidence":  "- Requested capability is currently absent from product scope\n- Requires architectural and functional scoping",
        "recommended_action":  "Validate desired functional scope and conduct engineering feasibility assessment.",
        "suggested_owner":  "Aditya",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EA-14573",
        "classification":  "Bug",
        "confidence":  0.73,
        "reason":  "Reported behavior violates existing documented functionality and expected system behavior.",
        "evidence":  "- Existing workflow produces incorrect outcome\n- Mismatch between expected and actual data state",
        "recommended_action":  "Reproduce and compare expected vs actual behavior in test environment.",
        "suggested_owner":  "Aditya",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EN-12920",
        "classification":  "Bug",
        "confidence":  0.93,
        "reason":  "Reported behavior violates existing documented functionality and expected system behavior.",
        "evidence":  "- Existing workflow produces incorrect outcome\n- Mismatch between expected and actual data state",
        "recommended_action":  "Reproduce and compare expected vs actual behavior in test environment.",
        "suggested_owner":  "Aditya Naresh",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EN-12410",
        "classification":  "Change Request",
        "confidence":  0.93,
        "reason":  "Ticket requests new capability or intentional alteration to existing system behavior.",
        "evidence":  "- Requested capability is currently absent from product scope\n- Requires architectural and functional scoping",
        "recommended_action":  "Validate desired functional scope and conduct engineering feasibility assessment.",
        "suggested_owner":  "Aman",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EA-14631",
        "classification":  "Bug",
        "confidence":  0.78,
        "reason":  "Reported behavior violates existing documented functionality and expected system behavior.",
        "evidence":  "- Existing workflow produces incorrect outcome\n- Mismatch between expected and actual data state",
        "recommended_action":  "Reproduce and compare expected vs actual behavior in test environment.",
        "suggested_owner":  "Ashfaque",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EA-14598",
        "classification":  "Change Request",
        "confidence":  0.87,
        "reason":  "Ticket requests new capability or intentional alteration to existing system behavior.",
        "evidence":  "- Requested capability is currently absent from product scope\n- Requires architectural and functional scoping",
        "recommended_action":  "Validate desired functional scope and conduct engineering feasibility assessment.",
        "suggested_owner":  "Ashfaque",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EA-14575",
        "classification":  "Bug",
        "confidence":  0.76,
        "reason":  "Reported behavior violates existing documented functionality and expected system behavior.",
        "evidence":  "- Existing workflow produces incorrect outcome\n- Mismatch between expected and actual data state",
        "recommended_action":  "Reproduce and compare expected vs actual behavior in test environment.",
        "suggested_owner":  "Ashfaque",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EA-14590",
        "classification":  "Config",
        "confidence":  0.76,
        "reason":  "The required capability is supported in the product; setup or account configuration prevents expected outcome.",
        "evidence":  "- Product module already supports target workflow\n- Account or parameter configuration check required",
        "recommended_action":  "Verify existing feature permissions and center-level configuration parameters.",
        "suggested_owner":  "Ashfaque",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EN-13023",
        "classification":  "Change Request",
        "confidence":  0.77,
        "reason":  "Ticket requests new capability or intentional alteration to existing system behavior.",
        "evidence":  "- Requested capability is currently absent from product scope\n- Requires architectural and functional scoping",
        "recommended_action":  "Validate desired functional scope and conduct engineering feasibility assessment.",
        "suggested_owner":  "Gurushesh",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EA-14333",
        "classification":  "Change Request",
        "confidence":  0.95,
        "reason":  "Ticket requests new capability or intentional alteration to existing system behavior.",
        "evidence":  "- Requested capability is currently absent from product scope\n- Requires architectural and functional scoping",
        "recommended_action":  "Validate desired functional scope and conduct engineering feasibility assessment.",
        "suggested_owner":  "Gurushesh",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EN-12874",
        "classification":  "Change Request",
        "confidence":  0.75,
        "reason":  "Ticket requests new capability or intentional alteration to existing system behavior.",
        "evidence":  "- Requested capability is currently absent from product scope\n- Requires architectural and functional scoping",
        "recommended_action":  "Validate desired functional scope and conduct engineering feasibility assessment.",
        "suggested_owner":  "Hasan",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EN-13009",
        "classification":  "Config",
        "confidence":  0.76,
        "reason":  "The required capability is supported in the product; setup or account configuration prevents expected outcome.",
        "evidence":  "- Product module already supports target workflow\n- Account or parameter configuration check required",
        "recommended_action":  "Verify existing feature permissions and center-level configuration parameters.",
        "suggested_owner":  "Hasan",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EA-14597",
        "classification":  "Change Request",
        "confidence":  0.85,
        "reason":  "Ticket requests new capability or intentional alteration to existing system behavior.",
        "evidence":  "- Requested capability is currently absent from product scope\n- Requires architectural and functional scoping",
        "recommended_action":  "Validate desired functional scope and conduct engineering feasibility assessment.",
        "suggested_owner":  "Hasan",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EA-14595",
        "classification":  "Config",
        "confidence":  0.88,
        "reason":  "The required capability is supported in the product; setup or account configuration prevents expected outcome.",
        "evidence":  "- Product module already supports target workflow\n- Account or parameter configuration check required",
        "recommended_action":  "Verify existing feature permissions and center-level configuration parameters.",
        "suggested_owner":  "Hasan",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EN-12993",
        "classification":  "Config",
        "confidence":  0.86,
        "reason":  "The required capability is supported in the product; setup or account configuration prevents expected outcome.",
        "evidence":  "- Product module already supports target workflow\n- Account or parameter configuration check required",
        "recommended_action":  "Verify existing feature permissions and center-level configuration parameters.",
        "suggested_owner":  "Joash",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EA-14633",
        "classification":  "Bug",
        "confidence":  0.92,
        "reason":  "Reported behavior violates existing documented functionality and expected system behavior.",
        "evidence":  "- Existing workflow produces incorrect outcome\n- Mismatch between expected and actual data state",
        "recommended_action":  "Reproduce and compare expected vs actual behavior in test environment.",
        "suggested_owner":  "Joash",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EA-14570",
        "classification":  "Bug",
        "confidence":  0.8,
        "reason":  "Reported behavior violates existing documented functionality and expected system behavior.",
        "evidence":  "- Existing workflow produces incorrect outcome\n- Mismatch between expected and actual data state",
        "recommended_action":  "Reproduce and compare expected vs actual behavior in test environment.",
        "suggested_owner":  "Joash",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EA-14517",
        "classification":  "Change Request",
        "confidence":  0.83,
        "reason":  "Ticket requests new capability or intentional alteration to existing system behavior.",
        "evidence":  "- Requested capability is currently absent from product scope\n- Requires architectural and functional scoping",
        "recommended_action":  "Validate desired functional scope and conduct engineering feasibility assessment.",
        "suggested_owner":  "Joash",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EN-12981",
        "classification":  "Bug",
        "confidence":  0.94,
        "reason":  "Reported behavior violates existing documented functionality and expected system behavior.",
        "evidence":  "- Existing workflow produces incorrect outcome\n- Mismatch between expected and actual data state",
        "recommended_action":  "Reproduce and compare expected vs actual behavior in test environment.",
        "suggested_owner":  "Laksh",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EA-14641",
        "classification":  "Bug",
        "confidence":  0.75,
        "reason":  "Reported behavior violates existing documented functionality and expected system behavior.",
        "evidence":  "- Existing workflow produces incorrect outcome\n- Mismatch between expected and actual data state",
        "recommended_action":  "Reproduce and compare expected vs actual behavior in test environment.",
        "suggested_owner":  "Milind",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EA-14645",
        "classification":  "Bug",
        "confidence":  0.72,
        "reason":  "Reported behavior violates existing documented functionality and expected system behavior.",
        "evidence":  "- Existing workflow produces incorrect outcome\n- Mismatch between expected and actual data state",
        "recommended_action":  "Reproduce and compare expected vs actual behavior in test environment.",
        "suggested_owner":  "Milind",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EA-14555",
        "classification":  "Bug",
        "confidence":  0.94,
        "reason":  "Reported behavior violates existing documented functionality and expected system behavior.",
        "evidence":  "- Existing workflow produces incorrect outcome\n- Mismatch between expected and actual data state",
        "recommended_action":  "Reproduce and compare expected vs actual behavior in test environment.",
        "suggested_owner":  "Milind",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EA-14468",
        "classification":  "Config",
        "confidence":  0.81,
        "reason":  "The required capability is supported in the product; setup or account configuration prevents expected outcome.",
        "evidence":  "- Product module already supports target workflow\n- Account or parameter configuration check required",
        "recommended_action":  "Verify existing feature permissions and center-level configuration parameters.",
        "suggested_owner":  "Nilesh",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EA-14668",
        "classification":  "Bug",
        "confidence":  0.81,
        "reason":  "Reported behavior violates existing documented functionality and expected system behavior.",
        "evidence":  "- Existing workflow produces incorrect outcome\n- Mismatch between expected and actual data state",
        "recommended_action":  "Reproduce and compare expected vs actual behavior in test environment.",
        "suggested_owner":  "Nilesh",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EA-14656",
        "classification":  "Config",
        "confidence":  0.93,
        "reason":  "The required capability is supported in the product; setup or account configuration prevents expected outcome.",
        "evidence":  "- Product module already supports target workflow\n- Account or parameter configuration check required",
        "recommended_action":  "Verify existing feature permissions and center-level configuration parameters.",
        "suggested_owner":  "Nilesh",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EA-14646",
        "classification":  "Change Request",
        "confidence":  0.92,
        "reason":  "Ticket requests new capability or intentional alteration to existing system behavior.",
        "evidence":  "- Requested capability is currently absent from product scope\n- Requires architectural and functional scoping",
        "recommended_action":  "Validate desired functional scope and conduct engineering feasibility assessment.",
        "suggested_owner":  "Nilesh",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EA-14624",
        "classification":  "Change Request",
        "confidence":  0.8,
        "reason":  "Ticket requests new capability or intentional alteration to existing system behavior.",
        "evidence":  "- Requested capability is currently absent from product scope\n- Requires architectural and functional scoping",
        "recommended_action":  "Validate desired functional scope and conduct engineering feasibility assessment.",
        "suggested_owner":  "Nilesh",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EA-14623",
        "classification":  "Change Request",
        "confidence":  0.86,
        "reason":  "Ticket requests new capability or intentional alteration to existing system behavior.",
        "evidence":  "- Requested capability is currently absent from product scope\n- Requires architectural and functional scoping",
        "recommended_action":  "Validate desired functional scope and conduct engineering feasibility assessment.",
        "suggested_owner":  "Nilesh",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EA-14603",
        "classification":  "Change Request",
        "confidence":  0.91,
        "reason":  "Ticket requests new capability or intentional alteration to existing system behavior.",
        "evidence":  "- Requested capability is currently absent from product scope\n- Requires architectural and functional scoping",
        "recommended_action":  "Validate desired functional scope and conduct engineering feasibility assessment.",
        "suggested_owner":  "Nilesh",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EA-14498",
        "classification":  "Change Request",
        "confidence":  0.78,
        "reason":  "Ticket requests new capability or intentional alteration to existing system behavior.",
        "evidence":  "- Requested capability is currently absent from product scope\n- Requires architectural and functional scoping",
        "recommended_action":  "Validate desired functional scope and conduct engineering feasibility assessment.",
        "suggested_owner":  "Nilesh",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EA-14670",
        "classification":  "Bug",
        "confidence":  0.84,
        "reason":  "Reported behavior violates existing documented functionality and expected system behavior.",
        "evidence":  "- Existing workflow produces incorrect outcome\n- Mismatch between expected and actual data state",
        "recommended_action":  "Reproduce and compare expected vs actual behavior in test environment.",
        "suggested_owner":  "Pragati",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EA-14648",
        "classification":  "Config",
        "confidence":  0.78,
        "reason":  "The required capability is supported in the product; setup or account configuration prevents expected outcome.",
        "evidence":  "- Product module already supports target workflow\n- Account or parameter configuration check required",
        "recommended_action":  "Verify existing feature permissions and center-level configuration parameters.",
        "suggested_owner":  "Pragati",
        "human_review":  "Not Required"
    }
]
  },
  {
    run_id: 'run_hist_v2',
    model_name: 'Claude 3.5 Sonnet',
    prompt_version: 'v2.0 Rule-Guided (Few-Shot)',
    dataset_target: 'HISTORICAL',
    created_at: '2026-10-05T16:30:00Z',
    description: 'Updated prompt enforcing the 5 Triage Decision Rules (expected behavior first, keywords ignored, cause separated from fix).',
    results: [
    {
        "ticket_id":  "EN-12896",
        "classification":  "Bug",
        "confidence":  0.77,
        "reason":  "Failure during parameter update could indicate API validation defect.",
        "evidence":  "- Endpoint returned unexpected response\n- User blocked from saving",
        "recommended_action":  "Verify API payload structure against schema.",
        "suggested_owner":  "Aditya Patle",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EA-14473",
        "classification":  "Config",
        "confidence":  0.9,
        "reason":  "Product capability already supports requirement; issue stems from account-level configuration or permission matrix.",
        "evidence":  "- Feature is natively supported across platform\n- Account configuration or permission mismatch identified",
        "recommended_action":  "Check account settings and permission matrix in admin console.",
        "suggested_owner":  "Aditya Patle",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EA-14542",
        "classification":  "Config",
        "confidence":  0.86,
        "reason":  "Product capability already supports requirement; issue stems from account-level configuration or permission matrix.",
        "evidence":  "- Feature is natively supported across platform\n- Account configuration or permission mismatch identified",
        "recommended_action":  "Check account settings and permission matrix in admin console.",
        "suggested_owner":  "Milind",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EA-14489",
        "classification":  "Bug",
        "confidence":  0.9,
        "reason":  "Confirmed defect: observed behavior violates existing documented specification.",
        "evidence":  "- Existing supported functionality produces erroneous output\n- Verification notes confirm failure of core workflow",
        "recommended_action":  "Reproduce against live/QA environment and analyze root cause.",
        "suggested_owner":  "Milind",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EN-12559",
        "classification":  "Bug",
        "confidence":  0.94,
        "reason":  "Confirmed defect: observed behavior violates existing documented specification.",
        "evidence":  "- Existing supported functionality produces erroneous output\n- Verification notes confirm failure of core workflow",
        "recommended_action":  "Reproduce against live/QA environment and analyze root cause.",
        "suggested_owner":  "Mohammad Ashfaque",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EA-14632",
        "classification":  "Config",
        "confidence":  0.86,
        "reason":  "Product capability already supports requirement; issue stems from account-level configuration or permission matrix.",
        "evidence":  "- Feature is natively supported across platform\n- Account configuration or permission mismatch identified",
        "recommended_action":  "Check account settings and permission matrix in admin console.",
        "suggested_owner":  "Nilesh",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EN-12915",
        "classification":  "Change Request",
        "confidence":  0.87,
        "reason":  "Intentional behavior enhancement or brand-new product feature requested.",
        "evidence":  "- Target functionality does not exist in current build\n- Product modification required to support new capability",
        "recommended_action":  "Document scope, acceptance criteria, and assess engineering feasibility.",
        "suggested_owner":  "Nilesh",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EA-14548",
        "classification":  "Bug",
        "confidence":  0.86,
        "reason":  "Confirmed defect: observed behavior violates existing documented specification.",
        "evidence":  "- Existing supported functionality produces erroneous output\n- Verification notes confirm failure of core workflow",
        "recommended_action":  "Reproduce against live/QA environment and analyze root cause.",
        "suggested_owner":  "Nilesh",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EA-14474",
        "classification":  "Bug",
        "confidence":  0.83,
        "reason":  "Confirmed defect: observed behavior violates existing documented specification.",
        "evidence":  "- Existing supported functionality produces erroneous output\n- Verification notes confirm failure of core workflow",
        "recommended_action":  "Reproduce against live/QA environment and analyze root cause.",
        "suggested_owner":  "Nilesh",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EN-12869",
        "classification":  "Bug",
        "confidence":  0.91,
        "reason":  "Confirmed defect: observed behavior violates existing documented specification.",
        "evidence":  "- Existing supported functionality produces erroneous output\n- Verification notes confirm failure of core workflow",
        "recommended_action":  "Reproduce against live/QA environment and analyze root cause.",
        "suggested_owner":  "Rasul",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EA-14463",
        "classification":  "Bug",
        "confidence":  0.84,
        "reason":  "Confirmed defect: observed behavior violates existing documented specification.",
        "evidence":  "- Existing supported functionality produces erroneous output\n- Verification notes confirm failure of core workflow",
        "recommended_action":  "Reproduce against live/QA environment and analyze root cause.",
        "suggested_owner":  "shubham",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EA-14485",
        "classification":  "Bug",
        "confidence":  0.93,
        "reason":  "Confirmed defect: observed behavior violates existing documented specification.",
        "evidence":  "- Existing supported functionality produces erroneous output\n- Verification notes confirm failure of core workflow",
        "recommended_action":  "Reproduce against live/QA environment and analyze root cause.",
        "suggested_owner":  "Sumit",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EN-12847",
        "classification":  "Needs Manual Triage",
        "confidence":  0.61,
        "reason":  "Ambiguous error: QR scanner failure cannot be distinguished between hardware/permission fault, bad format, or UI defect without device logs.",
        "evidence":  "- Missing reproduction steps\n- Ambiguity between scanner permission vs code defect",
        "recommended_action":  "Collect browser console logs and specific sample QR code payload from reporter.",
        "suggested_owner":  "Aditya Patle",
        "human_review":  "Required"
    },
    {
        "ticket_id":  "EA-14500",
        "classification":  "Config",
        "confidence":  0.93,
        "reason":  "Product capability already supports requirement; issue stems from account-level configuration or permission matrix.",
        "evidence":  "- Feature is natively supported across platform\n- Account configuration or permission mismatch identified",
        "recommended_action":  "Check account settings and permission matrix in admin console.",
        "suggested_owner":  "Aditya Patle",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EA-14529",
        "classification":  "Bug",
        "confidence":  0.96,
        "reason":  "Confirmed defect: observed behavior violates existing documented specification.",
        "evidence":  "- Existing supported functionality produces erroneous output\n- Verification notes confirm failure of core workflow",
        "recommended_action":  "Reproduce against live/QA environment and analyze root cause.",
        "suggested_owner":  "Aman",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EA-14480",
        "classification":  "Config",
        "confidence":  0.86,
        "reason":  "WhatsApp gateway capability exists in product; template registration and provider webhook credentials require verification.",
        "evidence":  "- WhatsApp feature toggle active in account\n- Message dispatch requires account-specific template approval",
        "recommended_action":  "Verify third-party WhatsApp provider credentials and template status in communication settings.",
        "suggested_owner":  "Hasan",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EA-14496",
        "classification":  "Bug",
        "confidence":  0.83,
        "reason":  "Confirmed defect: observed behavior violates existing documented specification.",
        "evidence":  "- Existing supported functionality produces erroneous output\n- Verification notes confirm failure of core workflow",
        "recommended_action":  "Reproduce against live/QA environment and analyze root cause.",
        "suggested_owner":  "Hasan",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EA-14466",
        "classification":  "Change Request",
        "confidence":  0.91,
        "reason":  "Intentional behavior enhancement or brand-new product feature requested.",
        "evidence":  "- Target functionality does not exist in current build\n- Product modification required to support new capability",
        "recommended_action":  "Document scope, acceptance criteria, and assess engineering feasibility.",
        "suggested_owner":  "Hasan",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EA-14479",
        "classification":  "Bug",
        "confidence":  0.82,
        "reason":  "Confirmed defect: observed behavior violates existing documented specification.",
        "evidence":  "- Existing supported functionality produces erroneous output\n- Verification notes confirm failure of core workflow",
        "recommended_action":  "Reproduce against live/QA environment and analyze root cause.",
        "suggested_owner":  "Joash",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EA-14168",
        "classification":  "Bug",
        "confidence":  0.95,
        "reason":  "Confirmed defect: observed behavior violates existing documented specification.",
        "evidence":  "- Existing supported functionality produces erroneous output\n- Verification notes confirm failure of core workflow",
        "recommended_action":  "Reproduce against live/QA environment and analyze root cause.",
        "suggested_owner":  "Joash",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EN-12890",
        "classification":  "Bug",
        "confidence":  0.88,
        "reason":  "Confirmed defect: observed behavior violates existing documented specification.",
        "evidence":  "- Existing supported functionality produces erroneous output\n- Verification notes confirm failure of core workflow",
        "recommended_action":  "Reproduce against live/QA environment and analyze root cause.",
        "suggested_owner":  "Milind",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EN-12850",
        "classification":  "Bug",
        "confidence":  0.82,
        "reason":  "Confirmed defect: observed behavior violates existing documented specification.",
        "evidence":  "- Existing supported functionality produces erroneous output\n- Verification notes confirm failure of core workflow",
        "recommended_action":  "Reproduce against live/QA environment and analyze root cause.",
        "suggested_owner":  "Milind",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EA-14491",
        "classification":  "Bug",
        "confidence":  0.95,
        "reason":  "Confirmed defect: observed behavior violates existing documented specification.",
        "evidence":  "- Existing supported functionality produces erroneous output\n- Verification notes confirm failure of core workflow",
        "recommended_action":  "Reproduce against live/QA environment and analyze root cause.",
        "suggested_owner":  "Milind",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EN-12863",
        "classification":  "Bug",
        "confidence":  0.84,
        "reason":  "Confirmed defect: observed behavior violates existing documented specification.",
        "evidence":  "- Existing supported functionality produces erroneous output\n- Verification notes confirm failure of core workflow",
        "recommended_action":  "Reproduce against live/QA environment and analyze root cause.",
        "suggested_owner":  "Mohammad Ashfaque",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EA-14515",
        "classification":  "Bug",
        "confidence":  0.94,
        "reason":  "Confirmed defect: observed behavior violates existing documented specification.",
        "evidence":  "- Existing supported functionality produces erroneous output\n- Verification notes confirm failure of core workflow",
        "recommended_action":  "Reproduce against live/QA environment and analyze root cause.",
        "suggested_owner":  "Mohammad Ashfaque",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EA-14464",
        "classification":  "Bug",
        "confidence":  0.92,
        "reason":  "Confirmed defect: observed behavior violates existing documented specification.",
        "evidence":  "- Existing supported functionality produces erroneous output\n- Verification notes confirm failure of core workflow",
        "recommended_action":  "Reproduce against live/QA environment and analyze root cause.",
        "suggested_owner":  "Mohammad Ashfaque",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EA-14357",
        "classification":  "Change Request",
        "confidence":  0.83,
        "reason":  "Intentional behavior enhancement or brand-new product feature requested.",
        "evidence":  "- Target functionality does not exist in current build\n- Product modification required to support new capability",
        "recommended_action":  "Document scope, acceptance criteria, and assess engineering feasibility.",
        "suggested_owner":  "Nilesh",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EA-14167",
        "classification":  "Bug",
        "confidence":  0.9,
        "reason":  "Confirmed defect: observed behavior violates existing documented specification.",
        "evidence":  "- Existing supported functionality produces erroneous output\n- Verification notes confirm failure of core workflow",
        "recommended_action":  "Reproduce against live/QA environment and analyze root cause.",
        "suggested_owner":  "Nilesh",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EA-14539",
        "classification":  "Change Request",
        "confidence":  0.84,
        "reason":  "Current product design does not enforce inventory mapping check on consumption trigger; adding validation check is an intentional behavior change.",
        "evidence":  "- Existing consumption logic executes unconditionally\n- Adding validation rule requires specification and development",
        "recommended_action":  "Validate requirement with Product Manager and prepare enhancement user story.",
        "suggested_owner":  "Pragati",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EA-14492",
        "classification":  "Config",
        "confidence":  0.92,
        "reason":  "Product capability already supports requirement; issue stems from account-level configuration or permission matrix.",
        "evidence":  "- Feature is natively supported across platform\n- Account configuration or permission mismatch identified",
        "recommended_action":  "Check account settings and permission matrix in admin console.",
        "suggested_owner":  "Pragati",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EA-14406",
        "classification":  "Change Request",
        "confidence":  0.82,
        "reason":  "Intentional behavior enhancement or brand-new product feature requested.",
        "evidence":  "- Target functionality does not exist in current build\n- Product modification required to support new capability",
        "recommended_action":  "Document scope, acceptance criteria, and assess engineering feasibility.",
        "suggested_owner":  "Pragati",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EA-14366",
        "classification":  "Bug",
        "confidence":  0.86,
        "reason":  "Confirmed defect: observed behavior violates existing documented specification.",
        "evidence":  "- Existing supported functionality produces erroneous output\n- Verification notes confirm failure of core workflow",
        "recommended_action":  "Reproduce against live/QA environment and analyze root cause.",
        "suggested_owner":  "Pragati",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EA-14534",
        "classification":  "Bug",
        "confidence":  0.93,
        "reason":  "Confirmed defect: observed behavior violates existing documented specification.",
        "evidence":  "- Existing supported functionality produces erroneous output\n- Verification notes confirm failure of core workflow",
        "recommended_action":  "Reproduce against live/QA environment and analyze root cause.",
        "suggested_owner":  "Rahul",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EA-14488",
        "classification":  "Bug",
        "confidence":  0.89,
        "reason":  "Confirmed defect: observed behavior violates existing documented specification.",
        "evidence":  "- Existing supported functionality produces erroneous output\n- Verification notes confirm failure of core workflow",
        "recommended_action":  "Reproduce against live/QA environment and analyze root cause.",
        "suggested_owner":  "Rahul",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EN-12883",
        "classification":  "Bug",
        "confidence":  0.95,
        "reason":  "Confirmed defect: observed behavior violates existing documented specification.",
        "evidence":  "- Existing supported functionality produces erroneous output\n- Verification notes confirm failure of core workflow",
        "recommended_action":  "Reproduce against live/QA environment and analyze root cause.",
        "suggested_owner":  "Rahul",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EN-12878",
        "classification":  "Change Request",
        "confidence":  0.9,
        "reason":  "Intentional behavior enhancement or brand-new product feature requested.",
        "evidence":  "- Target functionality does not exist in current build\n- Product modification required to support new capability",
        "recommended_action":  "Document scope, acceptance criteria, and assess engineering feasibility.",
        "suggested_owner":  "Rohit Rasam",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EA-14460",
        "classification":  "Bug",
        "confidence":  0.82,
        "reason":  "Confirmed defect: observed behavior violates existing documented specification.",
        "evidence":  "- Existing supported functionality produces erroneous output\n- Verification notes confirm failure of core workflow",
        "recommended_action":  "Reproduce against live/QA environment and analyze root cause.",
        "suggested_owner":  "Rohit Rasam",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EA-14454",
        "classification":  "Change Request",
        "confidence":  0.82,
        "reason":  "Intentional behavior enhancement or brand-new product feature requested.",
        "evidence":  "- Target functionality does not exist in current build\n- Product modification required to support new capability",
        "recommended_action":  "Document scope, acceptance criteria, and assess engineering feasibility.",
        "suggested_owner":  "Rucha",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EA-14538",
        "classification":  "Config",
        "confidence":  0.83,
        "reason":  "Product capability already supports requirement; issue stems from account-level configuration or permission matrix.",
        "evidence":  "- Feature is natively supported across platform\n- Account configuration or permission mismatch identified",
        "recommended_action":  "Check account settings and permission matrix in admin console.",
        "suggested_owner":  "shubham",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EA-14456",
        "classification":  "Bug",
        "confidence":  0.83,
        "reason":  "Confirmed defect: observed behavior violates existing documented specification.",
        "evidence":  "- Existing supported functionality produces erroneous output\n- Verification notes confirm failure of core workflow",
        "recommended_action":  "Reproduce against live/QA environment and analyze root cause.",
        "suggested_owner":  "shubham",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EA-14504",
        "classification":  "Change Request",
        "confidence":  0.97,
        "reason":  "Intentional behavior enhancement or brand-new product feature requested.",
        "evidence":  "- Target functionality does not exist in current build\n- Product modification required to support new capability",
        "recommended_action":  "Document scope, acceptance criteria, and assess engineering feasibility.",
        "suggested_owner":  "Somnath",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EA-14446",
        "classification":  "Change Request",
        "confidence":  0.88,
        "reason":  "Intentional behavior enhancement or brand-new product feature requested.",
        "evidence":  "- Target functionality does not exist in current build\n- Product modification required to support new capability",
        "recommended_action":  "Document scope, acceptance criteria, and assess engineering feasibility.",
        "suggested_owner":  "Somnath",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EA-14537",
        "classification":  "Bug",
        "confidence":  0.83,
        "reason":  "Confirmed defect: observed behavior violates existing documented specification.",
        "evidence":  "- Existing supported functionality produces erroneous output\n- Verification notes confirm failure of core workflow",
        "recommended_action":  "Reproduce against live/QA environment and analyze root cause.",
        "suggested_owner":  "Sumit",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EN-12849",
        "classification":  "Bug",
        "confidence":  0.84,
        "reason":  "Confirmed defect: observed behavior violates existing documented specification.",
        "evidence":  "- Existing supported functionality produces erroneous output\n- Verification notes confirm failure of core workflow",
        "recommended_action":  "Reproduce against live/QA environment and analyze root cause.",
        "suggested_owner":  "Tanmay",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EA-14518",
        "classification":  "Bug",
        "confidence":  0.95,
        "reason":  "Confirmed defect: observed behavior violates existing documented specification.",
        "evidence":  "- Existing supported functionality produces erroneous output\n- Verification notes confirm failure of core workflow",
        "recommended_action":  "Reproduce against live/QA environment and analyze root cause.",
        "suggested_owner":  "Tanmay",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EA-14523",
        "classification":  "Config",
        "confidence":  0.89,
        "reason":  "PO sequence numbering rules operate according to center/branch configuration; system behavior is functioning per configured sequence prefix.",
        "evidence":  "- Center sequence configuration reviewed\n- Multiple POs mapped across distinct procurement entities",
        "recommended_action":  "Review and align PO numbering configuration for the specific center setup.",
        "suggested_owner":  "Tanmay",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EA-14524",
        "classification":  "Config",
        "confidence":  0.97,
        "reason":  "Product capability already supports requirement; issue stems from account-level configuration or permission matrix.",
        "evidence":  "- Feature is natively supported across platform\n- Account configuration or permission mismatch identified",
        "recommended_action":  "Check account settings and permission matrix in admin console.",
        "suggested_owner":  "Tanmay",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EA-14484",
        "classification":  "Change Request",
        "confidence":  0.94,
        "reason":  "Intentional behavior enhancement or brand-new product feature requested.",
        "evidence":  "- Target functionality does not exist in current build\n- Product modification required to support new capability",
        "recommended_action":  "Document scope, acceptance criteria, and assess engineering feasibility.",
        "suggested_owner":  "Joash",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EA-14505",
        "classification":  "Change Request",
        "confidence":  0.96,
        "reason":  "Intentional behavior enhancement or brand-new product feature requested.",
        "evidence":  "- Target functionality does not exist in current build\n- Product modification required to support new capability",
        "recommended_action":  "Document scope, acceptance criteria, and assess engineering feasibility.",
        "suggested_owner":  "Rahul",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EA-14482",
        "classification":  "Change Request",
        "confidence":  0.87,
        "reason":  "Intentional behavior enhancement or brand-new product feature requested.",
        "evidence":  "- Target functionality does not exist in current build\n- Product modification required to support new capability",
        "recommended_action":  "Document scope, acceptance criteria, and assess engineering feasibility.",
        "suggested_owner":  "Rohit Rasam",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EA-14522",
        "classification":  "Bug",
        "confidence":  0.85,
        "reason":  "Confirmed defect: observed behavior violates existing documented specification.",
        "evidence":  "- Existing supported functionality produces erroneous output\n- Verification notes confirm failure of core workflow",
        "recommended_action":  "Reproduce against live/QA environment and analyze root cause.",
        "suggested_owner":  "Rohit Rasam",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EN-12007",
        "classification":  "Change Request",
        "confidence":  0.89,
        "reason":  "Intentional behavior enhancement or brand-new product feature requested.",
        "evidence":  "- Target functionality does not exist in current build\n- Product modification required to support new capability",
        "recommended_action":  "Document scope, acceptance criteria, and assess engineering feasibility.",
        "suggested_owner":  "Sachin",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EA-14493",
        "classification":  "Change Request",
        "confidence":  0.94,
        "reason":  "Intentional behavior enhancement or brand-new product feature requested.",
        "evidence":  "- Target functionality does not exist in current build\n- Product modification required to support new capability",
        "recommended_action":  "Document scope, acceptance criteria, and assess engineering feasibility.",
        "suggested_owner":  "Sumit",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EA-14647",
        "classification":  "Bug",
        "confidence":  0.84,
        "reason":  "Confirmed defect: observed behavior violates existing documented specification.",
        "evidence":  "- Existing supported functionality produces erroneous output\n- Verification notes confirm failure of core workflow",
        "recommended_action":  "Reproduce against live/QA environment and analyze root cause.",
        "suggested_owner":  "Aakash",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EA-14658",
        "classification":  "Bug",
        "confidence":  0.91,
        "reason":  "Confirmed defect: observed behavior violates existing documented specification.",
        "evidence":  "- Existing supported functionality produces erroneous output\n- Verification notes confirm failure of core workflow",
        "recommended_action":  "Reproduce against live/QA environment and analyze root cause.",
        "suggested_owner":  "Akshay",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EA-14683",
        "classification":  "Bug",
        "confidence":  0.98,
        "reason":  "Confirmed defect: observed behavior violates existing documented specification.",
        "evidence":  "- Existing supported functionality produces erroneous output\n- Verification notes confirm failure of core workflow",
        "recommended_action":  "Reproduce against live/QA environment and analyze root cause.",
        "suggested_owner":  "Aman",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EA-14665",
        "classification":  "Bug",
        "confidence":  0.93,
        "reason":  "Confirmed defect: observed behavior violates existing documented specification.",
        "evidence":  "- Existing supported functionality produces erroneous output\n- Verification notes confirm failure of core workflow",
        "recommended_action":  "Reproduce against live/QA environment and analyze root cause.",
        "suggested_owner":  "Laksh",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EN-12988",
        "classification":  "Change Request",
        "confidence":  0.87,
        "reason":  "Intentional behavior enhancement or brand-new product feature requested.",
        "evidence":  "- Target functionality does not exist in current build\n- Product modification required to support new capability",
        "recommended_action":  "Document scope, acceptance criteria, and assess engineering feasibility.",
        "suggested_owner":  "Milind",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EA-14655",
        "classification":  "Bug",
        "confidence":  0.98,
        "reason":  "Confirmed defect: observed behavior violates existing documented specification.",
        "evidence":  "- Existing supported functionality produces erroneous output\n- Verification notes confirm failure of core workflow",
        "recommended_action":  "Reproduce against live/QA environment and analyze root cause.",
        "suggested_owner":  "Milind",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EN-12984",
        "classification":  "Change Request",
        "confidence":  0.82,
        "reason":  "Intentional behavior enhancement or brand-new product feature requested.",
        "evidence":  "- Target functionality does not exist in current build\n- Product modification required to support new capability",
        "recommended_action":  "Document scope, acceptance criteria, and assess engineering feasibility.",
        "suggested_owner":  "Nilesh",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EN-13014",
        "classification":  "Bug",
        "confidence":  0.97,
        "reason":  "Confirmed defect: observed behavior violates existing documented specification.",
        "evidence":  "- Existing supported functionality produces erroneous output\n- Verification notes confirm failure of core workflow",
        "recommended_action":  "Reproduce against live/QA environment and analyze root cause.",
        "suggested_owner":  "Rahul",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EN-12982",
        "classification":  "Config",
        "confidence":  0.86,
        "reason":  "Product capability already supports requirement; issue stems from account-level configuration or permission matrix.",
        "evidence":  "- Feature is natively supported across platform\n- Account configuration or permission mismatch identified",
        "recommended_action":  "Check account settings and permission matrix in admin console.",
        "suggested_owner":  "Rahul",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EA-14659",
        "classification":  "Config",
        "confidence":  0.83,
        "reason":  "Product capability already supports requirement; issue stems from account-level configuration or permission matrix.",
        "evidence":  "- Feature is natively supported across platform\n- Account configuration or permission mismatch identified",
        "recommended_action":  "Check account settings and permission matrix in admin console.",
        "suggested_owner":  "Rasul Sayyed",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EA-14610",
        "classification":  "Bug",
        "confidence":  0.91,
        "reason":  "Confirmed defect: observed behavior violates existing documented specification.",
        "evidence":  "- Existing supported functionality produces erroneous output\n- Verification notes confirm failure of core workflow",
        "recommended_action":  "Reproduce against live/QA environment and analyze root cause.",
        "suggested_owner":  "shubham",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EA-14591",
        "classification":  "Bug",
        "confidence":  0.83,
        "reason":  "Confirmed defect: observed behavior violates existing documented specification.",
        "evidence":  "- Existing supported functionality produces erroneous output\n- Verification notes confirm failure of core workflow",
        "recommended_action":  "Reproduce against live/QA environment and analyze root cause.",
        "suggested_owner":  "shubham",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EN-12987",
        "classification":  "Change Request",
        "confidence":  0.84,
        "reason":  "Intentional behavior enhancement or brand-new product feature requested.",
        "evidence":  "- Target functionality does not exist in current build\n- Product modification required to support new capability",
        "recommended_action":  "Document scope, acceptance criteria, and assess engineering feasibility.",
        "suggested_owner":  "Sumit",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EN-12983",
        "classification":  "Change Request",
        "confidence":  0.87,
        "reason":  "Intentional behavior enhancement or brand-new product feature requested.",
        "evidence":  "- Target functionality does not exist in current build\n- Product modification required to support new capability",
        "recommended_action":  "Document scope, acceptance criteria, and assess engineering feasibility.",
        "suggested_owner":  "Yogesh Wagh",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EN-13044",
        "classification":  "Change Request",
        "confidence":  0.94,
        "reason":  "Intentional behavior enhancement or brand-new product feature requested.",
        "evidence":  "- Target functionality does not exist in current build\n- Product modification required to support new capability",
        "recommended_action":  "Document scope, acceptance criteria, and assess engineering feasibility.",
        "suggested_owner":  "Yogesh Wagh",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EA-14640",
        "classification":  "Change Request",
        "confidence":  0.82,
        "reason":  "Intentional behavior enhancement or brand-new product feature requested.",
        "evidence":  "- Target functionality does not exist in current build\n- Product modification required to support new capability",
        "recommended_action":  "Document scope, acceptance criteria, and assess engineering feasibility.",
        "suggested_owner":  "Aditya",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EA-14573",
        "classification":  "Bug",
        "confidence":  0.95,
        "reason":  "Confirmed defect: observed behavior violates existing documented specification.",
        "evidence":  "- Existing supported functionality produces erroneous output\n- Verification notes confirm failure of core workflow",
        "recommended_action":  "Reproduce against live/QA environment and analyze root cause.",
        "suggested_owner":  "Aditya",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EN-12920",
        "classification":  "Bug",
        "confidence":  0.86,
        "reason":  "Confirmed defect: observed behavior violates existing documented specification.",
        "evidence":  "- Existing supported functionality produces erroneous output\n- Verification notes confirm failure of core workflow",
        "recommended_action":  "Reproduce against live/QA environment and analyze root cause.",
        "suggested_owner":  "Aditya Naresh",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EN-12410",
        "classification":  "Change Request",
        "confidence":  0.96,
        "reason":  "Intentional behavior enhancement or brand-new product feature requested.",
        "evidence":  "- Target functionality does not exist in current build\n- Product modification required to support new capability",
        "recommended_action":  "Document scope, acceptance criteria, and assess engineering feasibility.",
        "suggested_owner":  "Aman",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EA-14631",
        "classification":  "Bug",
        "confidence":  0.91,
        "reason":  "Confirmed defect: observed behavior violates existing documented specification.",
        "evidence":  "- Existing supported functionality produces erroneous output\n- Verification notes confirm failure of core workflow",
        "recommended_action":  "Reproduce against live/QA environment and analyze root cause.",
        "suggested_owner":  "Ashfaque",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EA-14598",
        "classification":  "Change Request",
        "confidence":  0.92,
        "reason":  "Intentional behavior enhancement or brand-new product feature requested.",
        "evidence":  "- Target functionality does not exist in current build\n- Product modification required to support new capability",
        "recommended_action":  "Document scope, acceptance criteria, and assess engineering feasibility.",
        "suggested_owner":  "Ashfaque",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EA-14575",
        "classification":  "Bug",
        "confidence":  0.87,
        "reason":  "Confirmed defect: observed behavior violates existing documented specification.",
        "evidence":  "- Existing supported functionality produces erroneous output\n- Verification notes confirm failure of core workflow",
        "recommended_action":  "Reproduce against live/QA environment and analyze root cause.",
        "suggested_owner":  "Ashfaque",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EA-14590",
        "classification":  "Config",
        "confidence":  0.82,
        "reason":  "Product capability already supports requirement; issue stems from account-level configuration or permission matrix.",
        "evidence":  "- Feature is natively supported across platform\n- Account configuration or permission mismatch identified",
        "recommended_action":  "Check account settings and permission matrix in admin console.",
        "suggested_owner":  "Ashfaque",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EN-13023",
        "classification":  "Change Request",
        "confidence":  0.97,
        "reason":  "Intentional behavior enhancement or brand-new product feature requested.",
        "evidence":  "- Target functionality does not exist in current build\n- Product modification required to support new capability",
        "recommended_action":  "Document scope, acceptance criteria, and assess engineering feasibility.",
        "suggested_owner":  "Gurushesh",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EA-14333",
        "classification":  "Change Request",
        "confidence":  0.95,
        "reason":  "Intentional behavior enhancement or brand-new product feature requested.",
        "evidence":  "- Target functionality does not exist in current build\n- Product modification required to support new capability",
        "recommended_action":  "Document scope, acceptance criteria, and assess engineering feasibility.",
        "suggested_owner":  "Gurushesh",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EN-12874",
        "classification":  "Change Request",
        "confidence":  0.96,
        "reason":  "Intentional behavior enhancement or brand-new product feature requested.",
        "evidence":  "- Target functionality does not exist in current build\n- Product modification required to support new capability",
        "recommended_action":  "Document scope, acceptance criteria, and assess engineering feasibility.",
        "suggested_owner":  "Hasan",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EN-13009",
        "classification":  "Config",
        "confidence":  0.87,
        "reason":  "Product capability already supports requirement; issue stems from account-level configuration or permission matrix.",
        "evidence":  "- Feature is natively supported across platform\n- Account configuration or permission mismatch identified",
        "recommended_action":  "Check account settings and permission matrix in admin console.",
        "suggested_owner":  "Hasan",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EA-14597",
        "classification":  "Change Request",
        "confidence":  0.91,
        "reason":  "Intentional behavior enhancement or brand-new product feature requested.",
        "evidence":  "- Target functionality does not exist in current build\n- Product modification required to support new capability",
        "recommended_action":  "Document scope, acceptance criteria, and assess engineering feasibility.",
        "suggested_owner":  "Hasan",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EA-14595",
        "classification":  "Config",
        "confidence":  0.84,
        "reason":  "Product capability already supports requirement; issue stems from account-level configuration or permission matrix.",
        "evidence":  "- Feature is natively supported across platform\n- Account configuration or permission mismatch identified",
        "recommended_action":  "Check account settings and permission matrix in admin console.",
        "suggested_owner":  "Hasan",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EN-12993",
        "classification":  "Config",
        "confidence":  0.88,
        "reason":  "Product capability already supports requirement; issue stems from account-level configuration or permission matrix.",
        "evidence":  "- Feature is natively supported across platform\n- Account configuration or permission mismatch identified",
        "recommended_action":  "Check account settings and permission matrix in admin console.",
        "suggested_owner":  "Joash",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EA-14633",
        "classification":  "Bug",
        "confidence":  0.89,
        "reason":  "Confirmed defect: observed behavior violates existing documented specification.",
        "evidence":  "- Existing supported functionality produces erroneous output\n- Verification notes confirm failure of core workflow",
        "recommended_action":  "Reproduce against live/QA environment and analyze root cause.",
        "suggested_owner":  "Joash",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EA-14570",
        "classification":  "Bug",
        "confidence":  0.97,
        "reason":  "Confirmed defect: observed behavior violates existing documented specification.",
        "evidence":  "- Existing supported functionality produces erroneous output\n- Verification notes confirm failure of core workflow",
        "recommended_action":  "Reproduce against live/QA environment and analyze root cause.",
        "suggested_owner":  "Joash",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EA-14517",
        "classification":  "Change Request",
        "confidence":  0.91,
        "reason":  "Intentional behavior enhancement or brand-new product feature requested.",
        "evidence":  "- Target functionality does not exist in current build\n- Product modification required to support new capability",
        "recommended_action":  "Document scope, acceptance criteria, and assess engineering feasibility.",
        "suggested_owner":  "Joash",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EN-12981",
        "classification":  "Bug",
        "confidence":  0.95,
        "reason":  "Confirmed defect: observed behavior violates existing documented specification.",
        "evidence":  "- Existing supported functionality produces erroneous output\n- Verification notes confirm failure of core workflow",
        "recommended_action":  "Reproduce against live/QA environment and analyze root cause.",
        "suggested_owner":  "Laksh",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EA-14641",
        "classification":  "Bug",
        "confidence":  0.84,
        "reason":  "Confirmed defect: observed behavior violates existing documented specification.",
        "evidence":  "- Existing supported functionality produces erroneous output\n- Verification notes confirm failure of core workflow",
        "recommended_action":  "Reproduce against live/QA environment and analyze root cause.",
        "suggested_owner":  "Milind",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EA-14645",
        "classification":  "Bug",
        "confidence":  0.85,
        "reason":  "Confirmed defect: observed behavior violates existing documented specification.",
        "evidence":  "- Existing supported functionality produces erroneous output\n- Verification notes confirm failure of core workflow",
        "recommended_action":  "Reproduce against live/QA environment and analyze root cause.",
        "suggested_owner":  "Milind",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EA-14555",
        "classification":  "Bug",
        "confidence":  0.94,
        "reason":  "Confirmed defect: observed behavior violates existing documented specification.",
        "evidence":  "- Existing supported functionality produces erroneous output\n- Verification notes confirm failure of core workflow",
        "recommended_action":  "Reproduce against live/QA environment and analyze root cause.",
        "suggested_owner":  "Milind",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EA-14468",
        "classification":  "Config",
        "confidence":  0.91,
        "reason":  "Product capability already supports requirement; issue stems from account-level configuration or permission matrix.",
        "evidence":  "- Feature is natively supported across platform\n- Account configuration or permission mismatch identified",
        "recommended_action":  "Check account settings and permission matrix in admin console.",
        "suggested_owner":  "Nilesh",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EA-14668",
        "classification":  "Bug",
        "confidence":  0.84,
        "reason":  "Confirmed defect: observed behavior violates existing documented specification.",
        "evidence":  "- Existing supported functionality produces erroneous output\n- Verification notes confirm failure of core workflow",
        "recommended_action":  "Reproduce against live/QA environment and analyze root cause.",
        "suggested_owner":  "Nilesh",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EA-14656",
        "classification":  "Config",
        "confidence":  0.97,
        "reason":  "Product capability already supports requirement; issue stems from account-level configuration or permission matrix.",
        "evidence":  "- Feature is natively supported across platform\n- Account configuration or permission mismatch identified",
        "recommended_action":  "Check account settings and permission matrix in admin console.",
        "suggested_owner":  "Nilesh",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EA-14646",
        "classification":  "Change Request",
        "confidence":  0.85,
        "reason":  "Intentional behavior enhancement or brand-new product feature requested.",
        "evidence":  "- Target functionality does not exist in current build\n- Product modification required to support new capability",
        "recommended_action":  "Document scope, acceptance criteria, and assess engineering feasibility.",
        "suggested_owner":  "Nilesh",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EA-14624",
        "classification":  "Change Request",
        "confidence":  0.91,
        "reason":  "Intentional behavior enhancement or brand-new product feature requested.",
        "evidence":  "- Target functionality does not exist in current build\n- Product modification required to support new capability",
        "recommended_action":  "Document scope, acceptance criteria, and assess engineering feasibility.",
        "suggested_owner":  "Nilesh",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EA-14623",
        "classification":  "Change Request",
        "confidence":  0.97,
        "reason":  "Intentional behavior enhancement or brand-new product feature requested.",
        "evidence":  "- Target functionality does not exist in current build\n- Product modification required to support new capability",
        "recommended_action":  "Document scope, acceptance criteria, and assess engineering feasibility.",
        "suggested_owner":  "Nilesh",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EA-14603",
        "classification":  "Change Request",
        "confidence":  0.94,
        "reason":  "Intentional behavior enhancement or brand-new product feature requested.",
        "evidence":  "- Target functionality does not exist in current build\n- Product modification required to support new capability",
        "recommended_action":  "Document scope, acceptance criteria, and assess engineering feasibility.",
        "suggested_owner":  "Nilesh",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EA-14498",
        "classification":  "Change Request",
        "confidence":  0.87,
        "reason":  "Intentional behavior enhancement or brand-new product feature requested.",
        "evidence":  "- Target functionality does not exist in current build\n- Product modification required to support new capability",
        "recommended_action":  "Document scope, acceptance criteria, and assess engineering feasibility.",
        "suggested_owner":  "Nilesh",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EA-14670",
        "classification":  "Bug",
        "confidence":  0.95,
        "reason":  "Confirmed defect: observed behavior violates existing documented specification.",
        "evidence":  "- Existing supported functionality produces erroneous output\n- Verification notes confirm failure of core workflow",
        "recommended_action":  "Reproduce against live/QA environment and analyze root cause.",
        "suggested_owner":  "Pragati",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EA-14648",
        "classification":  "Config",
        "confidence":  0.96,
        "reason":  "Product capability already supports requirement; issue stems from account-level configuration or permission matrix.",
        "evidence":  "- Feature is natively supported across platform\n- Account configuration or permission mismatch identified",
        "recommended_action":  "Check account settings and permission matrix in admin console.",
        "suggested_owner":  "Pragati",
        "human_review":  "Not Required"
    }
]
  },
  {
    run_id: 'run_sprint_v1',
    model_name: 'Gemini 1.5 Pro',
    prompt_version: 'v1.0 Sprint Evaluator',
    dataset_target: 'CURRENT_SPRINT',
    created_at: '2026-10-06T02:15:00Z',
    description: 'Live sprint batch prediction over 52 raw Jira tickets awaiting product analyst validation.',
    results: [
    {
        "ticket_id":  "EN-13245",
        "classification":  "Needs Manual Triage",
        "confidence":  0.58,
        "reason":  "Ticket details are insufficient to determine whether issue is configuration setup or software defect.",
        "evidence":  "- Verification notes absent\n- Reproduction steps unclear",
        "recommended_action":  "Contact reporter to confirm exact reproduction steps and environment details.",
        "suggested_owner":  "Aman",
        "human_review":  "Required"
    },
    {
        "ticket_id":  "EN-13155",
        "classification":  "Bug",
        "confidence":  0.78,
        "reason":  "Observed behavior appears inconsistent with expected system performance.",
        "evidence":  "- Issue summary describes unexpected malfunction in current release",
        "recommended_action":  "Reproduce on staging environment to establish expected vs actual outcome.",
        "suggested_owner":  "Gurushesh",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EN-13239",
        "classification":  "Bug",
        "confidence":  0.8,
        "reason":  "Observed behavior appears inconsistent with expected system performance.",
        "evidence":  "- Issue summary describes unexpected malfunction in current release",
        "recommended_action":  "Reproduce on staging environment to establish expected vs actual outcome.",
        "suggested_owner":  "Rasul",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EN-13247",
        "classification":  "Bug",
        "confidence":  0.79,
        "reason":  "Observed behavior appears inconsistent with expected system performance.",
        "evidence":  "- Issue summary describes unexpected malfunction in current release",
        "recommended_action":  "Reproduce on staging environment to establish expected vs actual outcome.",
        "suggested_owner":  "Rohit Rasam",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EN-13252",
        "classification":  "Bug",
        "confidence":  0.92,
        "reason":  "Observed behavior appears inconsistent with expected system performance.",
        "evidence":  "- Issue summary describes unexpected malfunction in current release",
        "recommended_action":  "Reproduce on staging environment to establish expected vs actual outcome.",
        "suggested_owner":  "Rohit Rasam",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EA-14934",
        "classification":  "Config",
        "confidence":  0.88,
        "reason":  "Platform supports requirement; configuration or permission adjustments likely required.",
        "evidence":  "- Feature is active in production for other enterprise accounts",
        "recommended_action":  "Check client configuration settings and access controls.",
        "suggested_owner":  "ROhit Rasam",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EN-13356",
        "classification":  "Needs Manual Triage",
        "confidence":  0.58,
        "reason":  "Ticket details are insufficient to determine whether issue is configuration setup or software defect.",
        "evidence":  "- Verification notes absent\n- Reproduction steps unclear",
        "recommended_action":  "Contact reporter to confirm exact reproduction steps and environment details.",
        "suggested_owner":  "Triage Pool",
        "human_review":  "Required"
    },
    {
        "ticket_id":  "EA-14949",
        "classification":  "Bug",
        "confidence":  0.83,
        "reason":  "Observed behavior appears inconsistent with expected system performance.",
        "evidence":  "- Issue summary describes unexpected malfunction in current release",
        "recommended_action":  "Reproduce on staging environment to establish expected vs actual outcome.",
        "suggested_owner":  "Aakash",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EA-14898",
        "classification":  "Bug",
        "confidence":  0.92,
        "reason":  "Observed behavior appears inconsistent with expected system performance.",
        "evidence":  "- Issue summary describes unexpected malfunction in current release",
        "recommended_action":  "Reproduce on staging environment to establish expected vs actual outcome.",
        "suggested_owner":  "Aditya P",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EA-14855",
        "classification":  "Bug",
        "confidence":  0.93,
        "reason":  "Observed behavior appears inconsistent with expected system performance.",
        "evidence":  "- Issue summary describes unexpected malfunction in current release",
        "recommended_action":  "Reproduce on staging environment to establish expected vs actual outcome.",
        "suggested_owner":  "Aditya P",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EN-13340",
        "classification":  "Bug",
        "confidence":  0.91,
        "reason":  "Observed behavior appears inconsistent with expected system performance.",
        "evidence":  "- Issue summary describes unexpected malfunction in current release",
        "recommended_action":  "Reproduce on staging environment to establish expected vs actual outcome.",
        "suggested_owner":  "Aman",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EA-14894",
        "classification":  "Config",
        "confidence":  0.81,
        "reason":  "Suspected configuration mismatch rather than product bug based on account context.",
        "evidence":  "- Similar issues resolved through setting adjustments in past sprints",
        "recommended_action":  "Verify account module settings before escalating to development.",
        "suggested_owner":  "Gurushesh",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EA-14853",
        "classification":  "Needs Manual Triage",
        "confidence":  0.58,
        "reason":  "Ticket details are insufficient to determine whether issue is configuration setup or software defect.",
        "evidence":  "- Verification notes absent\n- Reproduction steps unclear",
        "recommended_action":  "Contact reporter to confirm exact reproduction steps and environment details.",
        "suggested_owner":  "Gurushesh",
        "human_review":  "Required"
    },
    {
        "ticket_id":  "EN-13228",
        "classification":  "Config",
        "confidence":  0.84,
        "reason":  "Platform supports requirement; configuration or permission adjustments likely required.",
        "evidence":  "- Feature is active in production for other enterprise accounts",
        "recommended_action":  "Check client configuration settings and access controls.",
        "suggested_owner":  "Hasan",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EN-13227",
        "classification":  "Bug",
        "confidence":  0.94,
        "reason":  "Observed behavior appears inconsistent with expected system performance.",
        "evidence":  "- Issue summary describes unexpected malfunction in current release",
        "recommended_action":  "Reproduce on staging environment to establish expected vs actual outcome.",
        "suggested_owner":  "Hasan",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EN-13159",
        "classification":  "Bug",
        "confidence":  0.95,
        "reason":  "Observed behavior appears inconsistent with expected system performance.",
        "evidence":  "- Issue summary describes unexpected malfunction in current release",
        "recommended_action":  "Reproduce on staging environment to establish expected vs actual outcome.",
        "suggested_owner":  "Hasan",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EA-14876",
        "classification":  "Bug",
        "confidence":  0.77,
        "reason":  "Observed behavior appears inconsistent with expected system performance.",
        "evidence":  "- Issue summary describes unexpected malfunction in current release",
        "recommended_action":  "Reproduce on staging environment to establish expected vs actual outcome.",
        "suggested_owner":  "Hasan",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EA-14863",
        "classification":  "Bug",
        "confidence":  0.87,
        "reason":  "Observed behavior appears inconsistent with expected system performance.",
        "evidence":  "- Issue summary describes unexpected malfunction in current release",
        "recommended_action":  "Reproduce on staging environment to establish expected vs actual outcome.",
        "suggested_owner":  "Hasan",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EN-13341",
        "classification":  "Needs Manual Triage",
        "confidence":  0.58,
        "reason":  "Ticket details are insufficient to determine whether issue is configuration setup or software defect.",
        "evidence":  "- Verification notes absent\n- Reproduction steps unclear",
        "recommended_action":  "Contact reporter to confirm exact reproduction steps and environment details.",
        "suggested_owner":  "Joash",
        "human_review":  "Required"
    },
    {
        "ticket_id":  "EA-14931",
        "classification":  "Bug",
        "confidence":  0.88,
        "reason":  "Observed behavior appears inconsistent with expected system performance.",
        "evidence":  "- Issue summary describes unexpected malfunction in current release",
        "recommended_action":  "Reproduce on staging environment to establish expected vs actual outcome.",
        "suggested_owner":  "Joash",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EA-14826",
        "classification":  "Config",
        "confidence":  0.85,
        "reason":  "Platform supports requirement; configuration or permission adjustments likely required.",
        "evidence":  "- Feature is active in production for other enterprise accounts",
        "recommended_action":  "Check client configuration settings and access controls.",
        "suggested_owner":  "Joash",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EA-14930",
        "classification":  "Config",
        "confidence":  0.9,
        "reason":  "Platform supports requirement; configuration or permission adjustments likely required.",
        "evidence":  "- Feature is active in production for other enterprise accounts",
        "recommended_action":  "Check client configuration settings and access controls.",
        "suggested_owner":  "Neha",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EA-14854",
        "classification":  "Config",
        "confidence":  0.81,
        "reason":  "Suspected configuration mismatch rather than product bug based on account context.",
        "evidence":  "- Similar issues resolved through setting adjustments in past sprints",
        "recommended_action":  "Verify account module settings before escalating to development.",
        "suggested_owner":  "Nilesh",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EA-14950",
        "classification":  "Bug",
        "confidence":  0.92,
        "reason":  "Observed behavior appears inconsistent with expected system performance.",
        "evidence":  "- Issue summary describes unexpected malfunction in current release",
        "recommended_action":  "Reproduce on staging environment to establish expected vs actual outcome.",
        "suggested_owner":  "Nilesh",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EN-13293",
        "classification":  "Needs Manual Triage",
        "confidence":  0.58,
        "reason":  "Ticket details are insufficient to determine whether issue is configuration setup or software defect.",
        "evidence":  "- Verification notes absent\n- Reproduction steps unclear",
        "recommended_action":  "Contact reporter to confirm exact reproduction steps and environment details.",
        "suggested_owner":  "Pragati",
        "human_review":  "Required"
    },
    {
        "ticket_id":  "EA-14933",
        "classification":  "Change Request",
        "confidence":  0.85,
        "reason":  "Request involves adding new capabilities or altering existing system workflows.",
        "evidence":  "- Capability not present in current release specification",
        "recommended_action":  "Engage Product Management for feasibility and acceptance criteria.",
        "suggested_owner":  "Rasul",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EA-14942",
        "classification":  "Bug",
        "confidence":  0.9,
        "reason":  "Observed behavior appears inconsistent with expected system performance.",
        "evidence":  "- Issue summary describes unexpected malfunction in current release",
        "recommended_action":  "Reproduce on staging environment to establish expected vs actual outcome.",
        "suggested_owner":  "Rasul",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EA-14947",
        "classification":  "Bug",
        "confidence":  0.78,
        "reason":  "Observed behavior appears inconsistent with expected system performance.",
        "evidence":  "- Issue summary describes unexpected malfunction in current release",
        "recommended_action":  "Reproduce on staging environment to establish expected vs actual outcome.",
        "suggested_owner":  "Rasul",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EA-14922",
        "classification":  "Bug",
        "confidence":  0.86,
        "reason":  "Observed behavior appears inconsistent with expected system performance.",
        "evidence":  "- Issue summary describes unexpected malfunction in current release",
        "recommended_action":  "Reproduce on staging environment to establish expected vs actual outcome.",
        "suggested_owner":  "Rasul",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EA-14915",
        "classification":  "Bug",
        "confidence":  0.91,
        "reason":  "Observed behavior appears inconsistent with expected system performance.",
        "evidence":  "- Issue summary describes unexpected malfunction in current release",
        "recommended_action":  "Reproduce on staging environment to establish expected vs actual outcome.",
        "suggested_owner":  "Rasul",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EA-14887",
        "classification":  "Needs Manual Triage",
        "confidence":  0.58,
        "reason":  "Ticket details are insufficient to determine whether issue is configuration setup or software defect.",
        "evidence":  "- Verification notes absent\n- Reproduction steps unclear",
        "recommended_action":  "Contact reporter to confirm exact reproduction steps and environment details.",
        "suggested_owner":  "Rasul",
        "human_review":  "Required"
    },
    {
        "ticket_id":  "EA-14862",
        "classification":  "Bug",
        "confidence":  0.78,
        "reason":  "Observed behavior appears inconsistent with expected system performance.",
        "evidence":  "- Issue summary describes unexpected malfunction in current release",
        "recommended_action":  "Reproduce on staging environment to establish expected vs actual outcome.",
        "suggested_owner":  "Rasul",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EN-13322",
        "classification":  "Bug",
        "confidence":  0.95,
        "reason":  "Observed behavior appears inconsistent with expected system performance.",
        "evidence":  "- Issue summary describes unexpected malfunction in current release",
        "recommended_action":  "Reproduce on staging environment to establish expected vs actual outcome.",
        "suggested_owner":  "Rohit Rasam",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EA-14842",
        "classification":  "Change Request",
        "confidence":  0.75,
        "reason":  "Request involves adding new capabilities or altering existing system workflows.",
        "evidence":  "- Capability not present in current release specification",
        "recommended_action":  "Engage Product Management for feasibility and acceptance criteria.",
        "suggested_owner":  "Rohit Rasam",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EN-13352",
        "classification":  "Bug",
        "confidence":  0.75,
        "reason":  "Observed behavior appears inconsistent with expected system performance.",
        "evidence":  "- Issue summary describes unexpected malfunction in current release",
        "recommended_action":  "Reproduce on staging environment to establish expected vs actual outcome.",
        "suggested_owner":  "Triage Pool",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EN-13126",
        "classification":  "Change Request",
        "confidence":  0.79,
        "reason":  "Request involves adding new capabilities or altering existing system workflows.",
        "evidence":  "- Capability not present in current release specification",
        "recommended_action":  "Engage Product Management for feasibility and acceptance criteria.",
        "suggested_owner":  "Triage Pool",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EA-14920",
        "classification":  "Needs Manual Triage",
        "confidence":  0.58,
        "reason":  "Ticket details are insufficient to determine whether issue is configuration setup or software defect.",
        "evidence":  "- Verification notes absent\n- Reproduction steps unclear",
        "recommended_action":  "Contact reporter to confirm exact reproduction steps and environment details.",
        "suggested_owner":  "Triage Pool",
        "human_review":  "Required"
    },
    {
        "ticket_id":  "EA-14918",
        "classification":  "Change Request",
        "confidence":  0.78,
        "reason":  "Request involves adding new capabilities or altering existing system workflows.",
        "evidence":  "- Capability not present in current release specification",
        "recommended_action":  "Engage Product Management for feasibility and acceptance criteria.",
        "suggested_owner":  "Triage Pool",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EA-14874",
        "classification":  "Bug",
        "confidence":  0.8,
        "reason":  "Observed behavior appears inconsistent with expected system performance.",
        "evidence":  "- Issue summary describes unexpected malfunction in current release",
        "recommended_action":  "Reproduce on staging environment to establish expected vs actual outcome.",
        "suggested_owner":  "Triage Pool",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EA-14846",
        "classification":  "Change Request",
        "confidence":  0.8,
        "reason":  "Request involves adding new capabilities or altering existing system workflows.",
        "evidence":  "- Capability not present in current release specification",
        "recommended_action":  "Engage Product Management for feasibility and acceptance criteria.",
        "suggested_owner":  "Gurushesh",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EN-12884",
        "classification":  "Change Request",
        "confidence":  0.93,
        "reason":  "Request involves adding new capabilities or altering existing system workflows.",
        "evidence":  "- Capability not present in current release specification",
        "recommended_action":  "Engage Product Management for feasibility and acceptance criteria.",
        "suggested_owner":  "Aman",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EA-14661",
        "classification":  "Change Request",
        "confidence":  0.84,
        "reason":  "Request involves adding new capabilities or altering existing system workflows.",
        "evidence":  "- Capability not present in current release specification",
        "recommended_action":  "Engage Product Management for feasibility and acceptance criteria.",
        "suggested_owner":  "Aman",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EA-14865",
        "classification":  "Needs Manual Triage",
        "confidence":  0.58,
        "reason":  "Ticket details are insufficient to determine whether issue is configuration setup or software defect.",
        "evidence":  "- Verification notes absent\n- Reproduction steps unclear",
        "recommended_action":  "Contact reporter to confirm exact reproduction steps and environment details.",
        "suggested_owner":  "Pragati",
        "human_review":  "Required"
    },
    {
        "ticket_id":  "EA-14476",
        "classification":  "Change Request",
        "confidence":  0.84,
        "reason":  "Request involves adding new capabilities or altering existing system workflows.",
        "evidence":  "- Capability not present in current release specification",
        "recommended_action":  "Engage Product Management for feasibility and acceptance criteria.",
        "suggested_owner":  "Pragati",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EA-14629",
        "classification":  "Change Request",
        "confidence":  0.91,
        "reason":  "Request involves adding new capabilities or altering existing system workflows.",
        "evidence":  "- Capability not present in current release specification",
        "recommended_action":  "Engage Product Management for feasibility and acceptance criteria.",
        "suggested_owner":  "Triage Pool",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EA-14750",
        "classification":  "Change Request",
        "confidence":  0.89,
        "reason":  "Request involves adding new capabilities or altering existing system workflows.",
        "evidence":  "- Capability not present in current release specification",
        "recommended_action":  "Engage Product Management for feasibility and acceptance criteria.",
        "suggested_owner":  "Triage Pool",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EN-13206",
        "classification":  "Change Request",
        "confidence":  0.96,
        "reason":  "Request involves adding new capabilities or altering existing system workflows.",
        "evidence":  "- Capability not present in current release specification",
        "recommended_action":  "Engage Product Management for feasibility and acceptance criteria.",
        "suggested_owner":  "Triage Pool",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EN-13249",
        "classification":  "Change Request",
        "confidence":  0.82,
        "reason":  "Request involves adding new capabilities or altering existing system workflows.",
        "evidence":  "- Capability not present in current release specification",
        "recommended_action":  "Engage Product Management for feasibility and acceptance criteria.",
        "suggested_owner":  "Triage Pool",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EA-14946",
        "classification":  "Needs Manual Triage",
        "confidence":  0.58,
        "reason":  "Ticket details are insufficient to determine whether issue is configuration setup or software defect.",
        "evidence":  "- Verification notes absent\n- Reproduction steps unclear",
        "recommended_action":  "Contact reporter to confirm exact reproduction steps and environment details.",
        "suggested_owner":  "Triage Pool",
        "human_review":  "Required"
    },
    {
        "ticket_id":  "EA-14929",
        "classification":  "Change Request",
        "confidence":  0.81,
        "reason":  "Request involves adding new capabilities or altering existing system workflows.",
        "evidence":  "- Capability not present in current release specification",
        "recommended_action":  "Engage Product Management for feasibility and acceptance criteria.",
        "suggested_owner":  "Triage Pool",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EA-14891",
        "classification":  "Change Request",
        "confidence":  0.78,
        "reason":  "Request involves adding new capabilities or altering existing system workflows.",
        "evidence":  "- Capability not present in current release specification",
        "recommended_action":  "Engage Product Management for feasibility and acceptance criteria.",
        "suggested_owner":  "Triage Pool",
        "human_review":  "Not Required"
    },
    {
        "ticket_id":  "EA-14830",
        "classification":  "Change Request",
        "confidence":  0.95,
        "reason":  "Request involves adding new capabilities or altering existing system workflows.",
        "evidence":  "- Capability not present in current release specification",
        "recommended_action":  "Engage Product Management for feasibility and acceptance criteria.",
        "suggested_owner":  "Triage Pool",
        "human_review":  "Not Required"
    }
]
  }
];

window.INITIAL_FEEDBACK = [
    {
        "ticket_id":  "EA-14523",
        "reason_quality":  "Needs Improvement",
        "reviewed_at":  "2026-10-06T03:30:00Z",
        "action_quality":  "Needs Improvement",
        "feedback_type":  "Configuration mistaken for Bug",
        "reviewer_comment":  "The model was misled by \u0027Same PO number is generated\u0027. In reality, the numbering sequence operates by center configuration and was working as configured.",
        "suggested_owner_quality":  "Good",
        "reviewer_classification":  "Config",
        "run_id":  "run_hist_v1",
        "reviewed_by":  "Lead Product Analyst",
        "reviewer_decision":  "Incorrect",
        "evidence_quality":  "Incorrect"
    },
    {
        "ticket_id":  "EA-14480",
        "reason_quality":  "Incorrect",
        "reviewed_at":  "2026-10-06T03:35:00Z",
        "action_quality":  "Needs Improvement",
        "feedback_type":  "Configuration mistaken for Bug",
        "reviewer_comment":  "WhatsApp notification gateway was working as expected; the failure was missing template registration for this organization.",
        "suggested_owner_quality":  "Good",
        "reviewer_classification":  "Config",
        "run_id":  "run_hist_v1",
        "reviewed_by":  "Lead Product Analyst",
        "reviewer_decision":  "Incorrect",
        "evidence_quality":  "Incorrect"
    },
    {
        "ticket_id":  "EA-14539",
        "reason_quality":  "Needs Improvement",
        "reviewed_at":  "2026-10-06T03:40:00Z",
        "action_quality":  "Incorrect",
        "feedback_type":  "Change Request mistaken for Bug",
        "reviewer_comment":  "Wording sounds like a defect (\u0027incorrectly displays\u0027), but adding validation before consumption is an intentional behavior change / enhancement.",
        "suggested_owner_quality":  "Good",
        "reviewer_classification":  "Change Request",
        "run_id":  "run_hist_v1",
        "reviewed_by":  "Lead Product Analyst",
        "reviewer_decision":  "Incorrect",
        "evidence_quality":  "Incorrect"
    },
    {
        "ticket_id":  "EA-14529",
        "reason_quality":  "Good",
        "reviewed_at":  "2026-10-06T03:45:00Z",
        "action_quality":  "Good",
        "feedback_type":  "",
        "reviewer_comment":  "Correctly identified as Bug. Fact that historical fix was DB query does not change underlying defect nature.",
        "suggested_owner_quality":  "Good",
        "reviewer_classification":  "Bug",
        "run_id":  "run_hist_v1",
        "reviewed_by":  "Lead Product Analyst",
        "reviewer_decision":  "Correct",
        "evidence_quality":  "Good"
    }
];
