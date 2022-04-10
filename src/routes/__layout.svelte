<script lang="ts">
  import '../app.scss';
  import '@fontsource/inter';
</script>

<main>
  <slot />
</main>

<footer>
  <style css="scss">
    main {
      flex: 1;
      display: flex;
      flex-direction: column;
      padding: 1rem;
      width: 100%;
      max-width: 600px;
      margin: 0 auto;
      box-sizing: border-box;
      margin-top: 2rem;
    }

    footer {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 40px;
    }

    @media (min-width: 480px) {
      footer {
        padding: 40px 0;
      }
    }
  </style>
</footer>
