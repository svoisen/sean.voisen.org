---
title: Writing
description: Blog archives.
hide_subscribe: true
---

<ul class="posts-list">
    {% for post in site.posts %}
    <li>
        <span class="post-title"><a href="{{ post.url }}">{{ post.title }}</a></span>
        <span class="post-metadata">{{ post.date | date: "%b %-d, %Y" }}</span>
    </li>
    {% endfor %}
</ul>
