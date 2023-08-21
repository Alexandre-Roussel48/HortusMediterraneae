import re

import markdown

import bleach

import config

def render_page(md_content):
    out = markdown.markdown(sanitize_text(md_content))
    out = re.sub('a href="http', 'a target="_blank" href="http', out)
    return out

def sanitize_text(text):
    return bleach.clean(text)

def user_format(username):
    return re.sub(' ', '+', username)