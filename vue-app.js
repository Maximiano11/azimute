(() => {
  if (!window.Vue) {
    console.warn('Vue 3 nao foi carregado.');
    return;
  }

  const { createApp, reactive } = window.Vue;

  const store = reactive({
    ready: true,
    version: '3',
    currentTheme: 'dark',
    currentPage: 'feed',
  });

  const app = createApp({
    template: '<span hidden aria-hidden="true"></span>',
    setup() {
      return { store };
    },
  });

  window.azimuteVue = {
    app,
    store,
  };

  app.mount('#vue-bootstrap');
})();
