---
layout: default
title: Авторы сайта
permalink: /author
---

Список авторов блога
<div class="row">
{% for authors in site.authors %}
<div class="col-4">
<div class="card" style="width: 18rem; margin-bottom: 2vw;">
  <img src="https://www.gravatar.com/avatar/{{ authors[1].gravatar }}?s=250&d=mm&r=x" class="card-img-top" alt="{{ author.display_name }}">
  <div class="card-body">
    <h5 class="card-title">{{ authors[1].name }}</h5>
    <ul class="contact-authors">
      <li><a href="mailto:{{ authors[1].email }}"><i class="fas fa-envelope"></i></a></li>
      <li><a href="{{ authors[1].instagram }}"><i class="fab fa-instagram"></i></a></li>
      <li><a href="{{ authors[1].facebook }}"><i class="fab fa-facebook-f"></i></a></li>
      <li><a href="{{ authors[1].twitter }}"><i class="fab fa-twitter"></i></a></li>
      <li><a href="{{ authors[1].web }}"><i class="fas fa-globe"></i></a></li>
    </ul>
    <p class="card-text">{{ authors[1].description }}</p>
    <a class="btn btn-primary" href="{{site.baseurl}}/author/authors:name">Открыть профиль</a>
  </div>
</div>
</div>
{% endfor %}
</div>

## Про компанию (блог)

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Suspendisse potenti nullam ac tortor vitae purus faucibus ornare suspendisse. In mollis nunc sed id. Tortor consequat id porta nibh. Orci dapibus ultrices in iaculis nunc. Netus et malesuada fames ac turpis egestas. Nisl rhoncus mattis rhoncus urna neque viverra. Arcu odio ut sem nulla. Ut venenatis tellus in metus vulputate eu scelerisque. Donec massa sapien faucibus et. Ullamcorper dignissim cras tincidunt lobortis. Pharetra magna ac placerat vestibulum lectus mauris ultrices eros.

Tortor posuere ac ut consequat semper. Sit amet facilisis magna etiam tempor orci. Venenatis lectus magna fringilla urna porttitor rhoncus. A erat nam at lectus urna. Pulvinar mattis nunc sed blandit libero volutpat sed cras ornare. Arcu felis bibendum ut tristique et. Tristique senectus et netus et malesuada fames ac. Habitant morbi tristique senectus et netus et malesuada. Tincidunt dui ut ornare lectus sit amet est placerat in. A arcu cursus vitae congue mauris. Aenean et tortor at risus viverra adipiscing. Interdum consectetur libero id faucibus nisl tincidunt eget nullam non. Ut tristique et egestas quis ipsum suspendisse ultrices. Eu turpis egestas pretium aenean pharetra magna ac placerat vestibulum. Porttitor massa id neque aliquam vestibulum morbi blandit cursus. Condimentum vitae sapien pellentesque habitant morbi tristique senectus. Rhoncus aenean vel elit scelerisque mauris pellentesque pulvinar pellentesque habitant. Lectus magna fringilla urna porttitor rhoncus dolor purus non.
