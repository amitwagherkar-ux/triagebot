# ==============================================================================
# Comprehensive Automated Test Suite for Triage Bot Evaluation Tool
# ==============================================================================

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "  RUNNING AUTOMATED TEST SUITE FOR TRIAGE BOT EVALUATOR   " -ForegroundColor White
Write-Host "==========================================================" -ForegroundColor Cyan

$passCount = 0
$failCount = 0

function Assert-Equal($testName, $actual, $expected) {
    if ($actual -eq $expected) {
        Write-Host "  [PASS] $testName" -ForegroundColor Green
        $script:passCount++
    } else {
        Write-Host "  [FAIL] $testName - Expected: '$expected', Got: '$actual'" -ForegroundColor Red
        $script:failCount++
    }
}

function Assert-True($testName, $condition) {
    if ($condition) {
        Write-Host "  [PASS] $testName" -ForegroundColor Green
        $script:passCount++
    } else {
        Write-Host "  [FAIL] $testName" -ForegroundColor Red
        $script:failCount++
    }
}

# ------------------------------------------------------------------------------
# Test 1: File Existence & Assets
# ------------------------------------------------------------------------------
Write-Host "`nTest Group 1: File Existence & Assets" -ForegroundColor Yellow

$requiredFiles = @(
    "100ClassifiedPastTickets.csv",
    "RawDataCurrentSprint.csv",
    "Triage_Bot_Evaluation_Tool_v1.csv",
    "index.html",
    "styles.css",
    "app.js",
    "seed-data.js",
    "baseline_runs.js",
    "SAMPLE_IMPORT_TEMPLATE.csv",
    "serve.ps1"
)

foreach ($f in $requiredFiles) {
    $path = Join-Path "C:\Users\CrelioHealth\Desktop\OfficeProjects\TriageBot" $f
    Assert-True "File exists: $f" (Test-Path $path)
}

# ------------------------------------------------------------------------------
# Test 2: Historical Baseline Distribution
# ------------------------------------------------------------------------------
Write-Host "`nTest Group 2: Baseline Ground Truth Distribution" -ForegroundColor Yellow

$histData = Import-Csv -Path "C:\Users\CrelioHealth\Desktop\OfficeProjects\TriageBot\100ClassifiedPastTickets.csv"
Assert-Equal "Total historical tickets count is 100" $histData.Count 100

$bugCount = ($histData | Where-Object { $_.Classification.Trim() -eq 'Bug' }).Count
$configCount = ($histData | Where-Object { $_.Classification.Trim() -eq 'Config' }).Count
$crCount = ($histData | Where-Object { $_.Classification.Trim() -eq 'Change Request' }).Count

Assert-Equal "Bug baseline count is 49" $bugCount 49
Assert-Equal "Config baseline count is 19" $configCount 19
Assert-Equal "Change Request baseline count is 32" $crCount 32

# ------------------------------------------------------------------------------
# Test 3: Benchmark Reference Tickets Check
# ------------------------------------------------------------------------------
Write-Host "`nTest Group 3: Benchmark Reference Tickets (Historical Ground Truth)" -ForegroundColor Yellow

$t_14529 = $histData | Where-Object { $_.'JIRA ID'.Trim() -eq 'EA-14529' }
Assert-Equal "EA-14529 (Bulk registration age) is Bug" $t_14529.Classification.Trim() 'Bug'
Assert-Equal "EA-14529 action is Fixed-DB Query" ($t_14529.'Human Action Taken'.Trim() -replace '\s+','-') 'Fixed-DB-Query'

$t_14523 = $histData | Where-Object { $_.'JIRA ID'.Trim() -eq 'EA-14523' }
Assert-Equal "EA-14523 (Inventory PO duplicate numbers) is Config" $t_14523.Classification.Trim() 'Config'

$t_14480 = $histData | Where-Object { $_.'JIRA ID'.Trim() -eq 'EA-14480' }
Assert-Equal "EA-14480 (WhatsApp messages not triggering) is Config" $t_14480.Classification.Trim() 'Config'

$t_14539 = $histData | Where-Object { $_.'JIRA ID'.Trim() -eq 'EA-14539' }
Assert-Equal "EA-14539 (Bulk Consumption Successful message) is Change Request" $t_14539.Classification.Trim() 'Change Request'

$t_12847 = $histData | Where-Object { $_.'JIRA ID'.Trim() -eq 'EN-12847' }
Assert-Equal "EN-12847 (QR code not scanned) is Bug" $t_12847.Classification.Trim() 'Bug'

$t_12410 = $histData | Where-Object { $_.'JIRA ID'.Trim() -eq 'EN-12410' }
Assert-Equal "EN-12410 (Aging Report based on Due Bills) is Change Request" $t_12410.Classification.Trim() 'Change Request'

# ------------------------------------------------------------------------------
# Test 4: Current Sprint Data Audit
# ------------------------------------------------------------------------------
Write-Host "`nTest Group 4: Current Sprint Data Audit" -ForegroundColor Yellow

$sprintData = Import-Csv -Path "C:\Users\CrelioHealth\Desktop\OfficeProjects\TriageBot\RawDataCurrentSprint.csv"
Assert-Equal "Total sprint tickets count is 52" $sprintData.Count 52

$unactionedCount = ($sprintData | Where-Object { [string]::IsNullOrWhiteSpace($_.'Human Action Taken') }).Count
Assert-Equal "Unactioned sprint tickets count is 30" $unactionedCount 30
Assert-True "Sprint tickets require human review workflow" ($unactionedCount -gt 0)

# ------------------------------------------------------------------------------
# Test 5: Local Web Server HTTP Response
# ------------------------------------------------------------------------------
Write-Host "`nTest Group 5: HTTP Web Server Endpoint" -ForegroundColor Yellow

try {
    $res = Invoke-WebRequest -Uri "http://localhost:3005" -UseBasicParsing -TimeoutSec 5
    Assert-Equal "HTTP status code is 200" $res.StatusCode 200
    Assert-True "HTML contains CrelioHealth brand" ($res.Content -match "CrelioHealth TriageBot Evaluator")
    Assert-True "HTML includes seed-data.js" ($res.Content -match 'seed-data\.js')
    Assert-True "HTML includes baseline_runs.js" ($res.Content -match 'baseline_runs\.js')
    Assert-True "HTML includes app.js" ($res.Content -match 'app\.js')
} catch {
    Assert-True "HTTP request succeeded" $false
}

# ------------------------------------------------------------------------------
# Summary
# ------------------------------------------------------------------------------
Write-Host "`n==========================================================" -ForegroundColor Cyan
Write-Host "  TEST SUMMARY: $passCount PASSED, $failCount FAILED" -ForegroundColor $(if ($failCount -eq 0) { "Green" } else { "Red" })
Write-Host "==========================================================" -ForegroundColor Cyan

if ($failCount -gt 0) {
    exit 1
} else {
    exit 0
}
