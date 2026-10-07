param([int]$Port = 3000)

$listener = [System.Net.HttpListener]::new()
$listener.Prefixes.Add("http://localhost:$Port/")
$listener.Prefixes.Add("http://127.0.0.1:$Port/")

try {
    $listener.Start()
} catch {
    Write-Host "Port $Port is busy or unavailable. Trying port $($Port + 1)..." -ForegroundColor Yellow
    $Port = $Port + 1
    $listener = [System.Net.HttpListener]::new()
    $listener.Prefixes.Add("http://localhost:$Port/")
    $listener.Prefixes.Add("http://127.0.0.1:$Port/")
    $listener.Start()
}

Write-Host ""
Write-Host "  =======================================================" -ForegroundColor Cyan
Write-Host "  CrelioHealth AI Triage Evaluator v2.0" -ForegroundColor White
Write-Host "  -------------------------------------------------------" -ForegroundColor DarkGray
Write-Host "  Local URL:   http://localhost:$Port" -ForegroundColor Green
Write-Host "  Network URL: http://127.0.0.1:$Port" -ForegroundColor Green
Write-Host "  -------------------------------------------------------" -ForegroundColor DarkGray
Write-Host "  Press Ctrl+C to terminate the local server." -ForegroundColor DarkGray
Write-Host "  =======================================================" -ForegroundColor Cyan
Write-Host ""

$root = $PSScriptRoot

$mimeTypes = @{
    ".html" = "text/html; charset=utf-8"
    ".css"  = "text/css; charset=utf-8"
    ".js"   = "application/javascript; charset=utf-8"
    ".json" = "application/json"
    ".csv"  = "text/csv; charset=utf-8"
    ".png"  = "image/png"
    ".jpg"  = "image/jpeg"
    ".jpeg" = "image/jpeg"
    ".gif"  = "image/gif"
    ".svg"  = "image/svg+xml"
    ".ico"  = "image/x-icon"
    ".woff" = "font/woff"
    ".woff2"= "font/woff2"
    ".ttf"  = "font/ttf"
}

try {
    while ($listener.IsListening) {
        $ctx = $listener.GetContext()
        try {
            $req      = $ctx.Request
            $res      = $ctx.Response
            $urlPath  = $req.Url.LocalPath

            if ($urlPath -eq "/") { $urlPath = "/index.html" }

            $filePath = Join-Path $root ($urlPath.TrimStart("/").Replace("/", "\"))

            if (Test-Path $filePath -PathType Leaf) {
                $ext   = [System.IO.Path]::GetExtension($filePath).ToLower()
                $mime  = if ($mimeTypes.ContainsKey($ext)) { $mimeTypes[$ext] } else { "application/octet-stream" }
                $bytes = [System.IO.File]::ReadAllBytes($filePath)

                $res.StatusCode        = 200
                $res.ContentType       = $mime
                $res.ContentLength64   = $bytes.Length
                $res.OutputStream.Write($bytes, 0, $bytes.Length)
            } else {
                $res.StatusCode = 404
                $body = [System.Text.Encoding]::UTF8.GetBytes("404 - Not Found: $urlPath")
                $res.ContentLength64 = $body.Length
                $res.OutputStream.Write($body, 0, $body.Length)
            }
            $res.OutputStream.Flush()
            $res.Close()
            Write-Host "  $($req.HttpMethod) $urlPath" -ForegroundColor DarkGray
        } catch {
            try { $ctx.Response.Close() } catch {}
        }
    }
} finally {
    $listener.Stop()
}
