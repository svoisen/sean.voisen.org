---
title: Reading
description: A reading list.
---

The following is a list of books and papers that have had a profound impact on how I think or view the world. This list is forever evolving, but is what I currently consider part of my _personal canon_.

<ul class="books-grid">
    {% assign books = site.data.books | sort: "title" %}
    {% for book in books %}
        <li class="books-grid-item">
            <details>
                <summary>
                    <picture>
                        <source type="image/webp" srcset="{{ site.url }}/assets/covers/{{ book.cover_image_slug }}@160.webp 160w, {{ site.url }}/assets/covers/{{ book.cover_image_slug }}@320.webp 320w">
                        <img src="{{ site.url }}/assets/covers/{{ book.cover_image_slug }}@160.webp" alt="{{ book.title }}" class="books-grid-cover" loading="lazy">
                    </picture>
                    <div class="books-grid-metadata">
                        <span class="books-grid-title" itemprop="title">{{ book.title }}</span>
                        <br>
                        by <span class="books-grid-author" itemprop="author">{{ book.author }}</span>
                    </div>
                </summary>
            </details>
        </li>
    {% endfor %}
</ul>