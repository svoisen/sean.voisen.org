---
layout: default
title: Notes
description: Short thoughts and notes.
---

<div class="notes">
    {% for note in site.notes reversed %}
    <article class="note">
        <header class="note-heading">
            <h2 class="note-title">{{ note.title }} <a href="{{ note.url }}">#</a></h2>
            <time class="note-date" datetime="{{ note.date | date: '%F' }}">{{ note.date | date: "%b %-d, %Y" }}</time>
        </header>
        <div class="note-contents">
        {{ note.content | markdownify }}
        </div>
    </article>
    {% endfor %}
</div>
