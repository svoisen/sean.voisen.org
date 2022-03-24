---
layout: page
title: Reading
---

The following is a list of books and papers that have had a profound impact on how I think or view the world. I consider these part of my _personal canon_—my desert island reading.

<ul class="reading">
    {% assign books = site.data.books | sort: "title" %}
    {% for book in books %}
        <li><a href="{{ book.link }}">{{ book.title }}</a><br><span class="metadata">by {{ book.author }}</span></li>
    {% endfor %}
</ul>