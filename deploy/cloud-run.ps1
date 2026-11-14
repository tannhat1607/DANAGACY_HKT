param(
    [Parameter(Mandatory=$true)][string]$ProjectId,
    [string]$Region = 'asia-southeast1',
    [string]$Service = 'danangacy'
)
$ErrorActionPreference = 'Stop'
Push-Location (Split-Path $PSScriptRoot -Parent)
try {
    gcloud services enable run.googleapis.com cloudbuild.googleapis.com artifactregistry.googleapis.com --project $ProjectId
    if ($LASTEXITCODE -ne 0) { throw 'Không thể bật dịch vụ Google Cloud' }
    gcloud run deploy $Service --source . --project $ProjectId --region $Region --port 8080 --memory 512Mi --cpu 1 --min-instances 0 --max-instances 3 --timeout 60 --allow-unauthenticated
    if ($LASTEXITCODE -ne 0) { throw 'Deploy thất bại' }
} finally { Pop-Location }
