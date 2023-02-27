---
title: Reading
description: A reading list.
---

The following is a list of books and papers that have had a profound impact on how I think or view the world. This list is forever evolving, but is what I currently consider part of my _personal canon_.

<ul class="books-grid">
    {% assign books = site.data.books | where:"canon", "true" | sort:"title" %}
    {% for book in books %}
        <li class="books-grid-item">
            <a href="https://openlibrary.org/works/{{ book.open_library }}">
                <picture>
                    <source type="image/webp" srcset="{{ site.url }}/assets/covers/{{ book.slug }}@160.webp 160w, {{ site.url }}/assets/covers/{{ book.slug }}@320.webp 320w">
                    <img src="{{ site.url }}/assets/covers/{{ book.slug }}@160.webp" alt="{{ book.title }}" class="books-grid-cover" loading="lazy">
                </picture>
            </a>
            <div class="books-grid-metadata">
                <a href="https://openlibrary.org/works/{{ book.open_library }}">{{ book.title }}</a><br><span class="books-grid-author">by {{ book.author }}</span>
            </div>
        </li>
    {% endfor %}
</ul>

