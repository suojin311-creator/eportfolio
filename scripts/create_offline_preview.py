"""Bundle the built website for local review without installing a web server."""
from pathlib import Path
import base64
import re
import shutil
import zipfile

ROOT = Path(__file__).resolve().parents[1]
DIST = ROOT / 'dist'
OUT = ROOT / 'offline-preview'

if not (DIST / 'index.html').is_file():
    raise SystemExit('Please run npm run build first.')
if OUT.exists():
    shutil.rmtree(OUT)
OUT.mkdir()

html = (DIST / 'index.html').read_text()
js_tags = re.findall(r'<script\b[^>]*\bsrc="([^"]+)"[^>]*></script>', html)
css_tags = re.findall(r'<link\b[^>]*\bhref="([^"]+\.css)"[^>]*>', html)
if len(js_tags) != 1 or len(css_tags) != 1:
    raise SystemExit('This preview builder expects one JS and one CSS entry.')
js = (DIST / js_tags[0].lstrip('/')).read_text()
css = (DIST / css_tags[0].lstrip('/')).read_text()

image = base64.b64encode((DIST / 'media/content-library.png').read_bytes()).decode()
js = js.replace('/media/content-library.png', 'data:image/png;base64,' + image)
js = js.replace('/media/product-demo.mp4', './media/product-demo.mp4')
js = js.replace('/documents/', './documents/')
js = js.replace('</script', '<\\/script')
favicon = base64.b64encode((DIST / 'favicon.svg').read_bytes()).decode()
html = html.replace('/favicon.svg', 'data:image/svg+xml;base64,' + favicon)
html = re.sub(r'<script\b[^>]*\bsrc="[^"]+"[^>]*></script>', lambda _: '<script>window.__PORTFOLIO_PREVIEW__=true;</script><script type="module">' + js + '</script>', html)
html = re.sub(r'<link\b[^>]*\bhref="[^"]+\.css"[^>]*>', lambda _: '<style>' + css + '</style>', html)
(OUT / 'index.html').write_text(html)
shutil.copytree(DIST / 'documents', OUT / 'documents')
(OUT / 'media').mkdir()
shutil.copy2(DIST / 'media/product-demo.mp4', OUT / 'media/product-demo.mp4')
(OUT / '打开方式.txt').write_text('解压完整文件夹后，用桌面浏览器打开 index.html。\n首页、项目详情与交互示意均可使用；附件和视频请保留在相对目录。\n如浏览器策略不允许本地文件，可在此目录运行 python3 -m http.server 8080，再从浏览器访问该本地服务。\n这是本地审阅版网站，尚未发布到公网。\n')

archive = ROOT / 'Product_Portfolio_Website_Preview.zip'
with zipfile.ZipFile(archive, 'w', zipfile.ZIP_DEFLATED) as z:
    for p in sorted(OUT.rglob('*')):
        if p.is_file(): z.write(p, p.relative_to(OUT))
print(archive)
