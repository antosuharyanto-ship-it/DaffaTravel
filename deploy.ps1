# Automation Script: deploy.ps1

# 1. Commit all changes
git add .
$message = Read-Host "Enter commit message (default: 'update: premium UI and content')"
if ($message -eq "") { $message = "update: premium UI and content" }
git commit -m $message

# 2. Push to GitHub
git push origin main

Write-Host "`n🚀 Changes pushed to GitHub!" -ForegroundColor Green
Write-Host "Vercel will automatically start a new deployment." -ForegroundColor Cyan
Write-Host "Note: If you see the 'Resource is limited' error on Vercel, you may need to wait 1 hour before it deploys again." -ForegroundColor Yellow
