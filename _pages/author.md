---
layout: default
title: Автора блога — Максим
permalink: /author/authors:name
---

Страница автора

<!-- {{site.baseurl}}/{{page.permalink}} -->
<img src="https://www.gravatar.com/avatar/95bc56a8e3cf3f1a2cc586731103e6c9?s=250&d=mm&r=x" class="img-thumbnail" alt="Фото профиля автора Максим">

<div class="bd-example">
        <nav>
          <div class="nav nav-tabs mb-3" id="nav-tab" role="tablist">
            <a class="nav-link" id="nav-home-tab" data-bs-toggle="tab" href="{{site.baseurl}}{{page.permalink}}#nav-home" role="tab" aria-controls="nav-home" aria-selected="false">Статьи</a>
            <a class="nav-link" id="nav-profile-tab" data-bs-toggle="tab" href="{{site.baseurl}}{{page.permalink}}#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="false">Информация</a>
            <a class="nav-link active" id="nav-contact-tab" data-bs-toggle="tab" href="{{site.baseurl}}{{page.permalink}}#nav-contact" role="tab" aria-controls="nav-contact" aria-selected="true">Дополнительно</a>
          </div>
        </nav>
        <div class="tab-content" id="nav-tabContent">
          <div class="tab-pane fade" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
            <p>Список статье автора</p>
          </div>
          <div class="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
            <p>Информация</p>
          </div>
          <div class="tab-pane fade active show" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">
            <p>Доп инфа</p>
          </div>
        </div>
        </div>
