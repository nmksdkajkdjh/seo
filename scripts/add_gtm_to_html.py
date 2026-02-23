#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
全HTMLページに GTM-5K8TFZZG を追加
既にGTMがあるファイルはスキップ
"""
import os
import re

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
GTM_ID = "GTM-5K8TFZZG"

HEAD_SNIPPET = f'''  <!-- Google Tag Manager -->
  <script>(function(w,d,s,l,i){{w[l]=w[l]||[];w[l].push({{'gtm.start':
  new Date().getTime(),event:'gtm.js'}});var f=d.getElementsByTagName(s)[0],
  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
  }})(window,document,'script','dataLayer','{GTM_ID}');</script>
  <!-- End Google Tag Manager -->
'''

BODY_SNIPPET = f'''  <!-- Google Tag Manager (noscript) -->
  <noscript><iframe src="https://www.googletagmanager.com/ns.html?id={GTM_ID}"
  height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
  <!-- End Google Tag Manager (noscript) -->
'''


def add_gtm(path: str) -> bool:
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()
    if GTM_ID in content:
        return False  # already has GTM
    # Add head snippet: right after <head> or <head>\n
    if "<head>" in content and HEAD_SNIPPET.strip() not in content:
        content = re.sub(r"(<head>\s*)", r"\1" + HEAD_SNIPPET, content, count=1)
    # Add body snippet: right after <body...> 
    body_pattern = r"(<body[^>]*>\s*)"
    if re.search(body_pattern, content) and BODY_SNIPPET.strip() not in content:
        content = re.sub(body_pattern, r"\1" + BODY_SNIPPET, content, count=1)
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    return True


def main():
    site_dir = os.path.join(BASE, "site")
    skip = {"gtm-head.html", "gtm-body.html"}
    updated = []
    for root, _, files in os.walk(site_dir):
        for name in files:
            if not name.endswith(".html") or name in skip:
                continue
            path = os.path.join(root, name)
            if add_gtm(path):
                updated.append(os.path.relpath(path, BASE))
    for p in sorted(updated):
        print(f"  + {p}")
    print(f"\nUpdated {len(updated)} files.")


if __name__ == "__main__":
    main()
