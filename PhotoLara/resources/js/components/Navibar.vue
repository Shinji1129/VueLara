<template>
  <nav class="navbar">
    <RouterLink class="brand" to="/">
    <h1>PhotoLara</h1>
    </RouterLink>
    <div class="nav-menu">
      <ul class="nav-list">
        <li class="nav-item">
          <button class="btn">
            <i class="icon ion-md-add"></i>
            投稿する
          </button>
        </li>
        <li class="nav-item">
          お名前
        </li>
        <li class="nav-item">
          <RouterLink class="btn btn-link" to="/login">
          登録する
          </RouterLink>
        </li>
      </ul>
    </div>
  </nav>
</template>
