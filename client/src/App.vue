<template>
  <div ip="app">
    <nav class="navbar navbar-expand navbar-dark bg-dark static-top">
      <a class="navbar-brand mr-1" href="/">FeraCode</a>

      <button
        class="btn btn-link btn-sm text-white order-1 order-sm-0"
        id="sidebarToggle"
        href="#"
      >
        <i class="fas fa-bars"></i>
      </button>

      <form
        class="d-none d-md-inline-block form-inline ml-auto mr-0 mr-md-3 my-2 my-md-0"
      >
      </form>

      <!-- Navbar -->
      <ul class="navbar-nav ml-auto ml-md-0">
        <li class="nav-item dropdown no-arrow">
          <a
            class="nav-link dropdown-toggle"
            href="#"
            id="userDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <i class="fas fa-user-circle fa-fw"></i>
          </a>
          <div
            class="dropdown-menu dropdown-menu-right"
            aria-labelledby="userDropdown"
          >
            <a class="dropdown-item" href="#">Settings</a>
            <a class="dropdown-item" href="#">Activity Log</a>
            <div class="dropdown-divider"></div>
            <a
              class="dropdown-item"
              href="#"
              data-toggle="modal"
              data-target="#logoutModal"
              >Logout</a
            >
          </div>
        </li>
      </ul>
    </nav>

    <div id="wrapper">
      <!-- Sidebar -->
      <ul class="sidebar navbar-nav">
        <li class="nav-item">
          <router-link class="nav-link" :to="{name: 'Home'}">
            <i class="fas fa-fw fa-tachometer-alt"></i>
            <span>Dashboard</span>
          </router-link>
        </li>
        <li class="nav-item dropdown">
          <a
            class="nav-link dropdown-toggle"
            href="#"
            id="pagesDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <i class="fas fa-fw fa-folder"></i>
            <span>CRUD</span>
          </a>
          <div class="dropdown-menu" aria-labelledby="pagesDropdown">
            <router-link class="dropdown-item" :to="{name: 'Diapers'}">Models</router-link>
          </div>
        </li>
        <li class="nav-item">
          <router-link to="/diapers" class="nav-link">
              <i class="fas fa-fw fa-chart-area"></i>
              <span>Diapers</span>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link :to="{name: 'Diapers'}" class="nav-link">
            <i class="fas fa-fw fa-table"></i>
            <span>Diapers</span>
          </router-link>
        </li>
      </ul>

      <div id="content-wrapper">
        <div class="container-fluid">
          <router-view> </router-view>
        </div>

        <footer class="sticky-footer">
          <div class="container my-auto">
            <div class="copyright text-center my-auto">
              <span>Copyright © FeraCode 2019 - Developed by ChristianCury</span>
            </div>
          </div>
        </footer>
      </div>
      <!-- /.content-wrapper -->
    </div>
    <!-- /#wrapper -->

    <!-- Scroll to Top Button-->
    <a class="scroll-to-top rounded" href="#page-top">
      <i class="fas fa-angle-up"></i>
    </a>

    <!-- Logout Modal-->
    <div
      class="modal fade"
      id="logoutModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Ready to Leave?</h5>
            <button
              class="close"
              type="button"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div class="modal-body">
            Select "Logout" below if you are ready to end your current session.
          </div>
          <div class="modal-footer">
            <button
              class="btn btn-secondary"
              type="button"
              data-dismiss="modal"
            >
              Cancel
            </button>
            <a class="btn btn-primary" href="login.html">Logout</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
