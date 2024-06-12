<template>
  <nav class="navbar navbar-expand-sm bg-warning navbar-dark sticky-top">
    <div class="container justify-content-between">
      <router-link to="/" class="navbar-brand">가계부</router-link>
      <div class="collapse navbar-collapse" id="mynavbar1">
        <ul class="navbar-nav me-auto">
          <li class="nav-item">
            <PieChartLink />
          </li>
          <li class="nav-item">
            <router-link to="/Chart" class="nav-link">통계</router-link>
          </li>
        </ul>
      </div>
      <div class="d-flex">
        <div class="collapse navbar-collapse d-none d-sm-block" id="mynavbar">
          <ul class="navbar-nav me-auto">
            <li class="nav-item">
              <router-link to="/profile" class="nav-link">
                <i class="fa-solid fa-user-tie"></i> 프로필
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>
<script setup></script>
