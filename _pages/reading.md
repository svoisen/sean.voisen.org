---
layout: page
title: Reading
---

The following is a list of books and papers that have had a profound impact on how I think or view the world. This list is forever evolving, but is what I currently consider part of my _personal canon_.

<ul class="books-list">
    {% assign books = site.data.books | sort: "title" %}
    {% for book in books %}
        <li><a href="{{ book.link }}">{{ book.title }}</a><br><span class="book-metadata">by {{ book.author }}</span></li>
    {% endfor %}
</ul>