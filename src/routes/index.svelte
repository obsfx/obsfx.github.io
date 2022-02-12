<script context="module" lang="ts">
  export const prerender = true;
</script>

<svelte:head>
  <title>Ömercan Balandı</title>
</svelte:head>

<section>
  <div class="head">
    <h1>
      <a href="/">Ömercan Balandı</a>
    </h1>

    <h2>A passionate <strong>software developer</strong> based in Izmir, Turkey.</h2>
  </div>

  <div class="info">
    <p>
      Working on <strong>web applications</strong>. Creating
      <a href="https://github.com/obsfx/zero-ld46" alt="Zero: Ludum Dare 46">games</a> and
      <a href="https://codepen.io/obsfx" alt="Codepen">codepen demos</a>
      in spare time. Crafting
      <a href="https://github.com/obsfx/libgen-downloader" alt="Libgen Downloader"
        >command-line tools</a
      >,
      <a href="https://github.com/obsfx/lurkdown" alt="Lurkdown">small compilers</a> and
      <a href="https://omercan.io/m3k/" alt="m3k">toy programming</a> languages just for fun.
    </p>

    <p class="neovim">
      Loves using <img src="Neovim-logo.svg" alt="neovim" />
    </p>
  </div>

  <div class="section">
    <h2>Resume</h2>
    <ul>
      <li>
        <a target="__blank" href="https://omercan.io/resume/Omercan-Balandi-Resume.pdf">Download</a>
      </li>
    </ul>
  </div>

  <div class="section">
    <h2>See my projects</h2>

    <ul>
      <li>
        <span>@github</span>
        <a href="https://github.com/obsfx">github.com/obsfx</a>
      </li>
      <li>
        <span>@npm</span>
        <a href="https://www.npmjs.com/~obsfx">npmjs.com/~obsfx</a>
      </li>
      <li>
        <span>@codepen</span>
        <a href="https://codepen.io/obsfx">codepen.io/obsfx</a>
      </li>
      <li>
        <span>@itch.io</span>
        <a href="https://obsfx.itch.io/">obsfx.itch.io</a>
      </li>
    </ul>
  </div>

  <div class="section">
    <h2>Contact</h2>

    <ul>
      <li>
        <span>@email</span>
        <a href="mailto:balandiomer@gmail.com">balandiomer@gmail.com</a>
      </li>
      <li>
        <span>@linkedin</span>
        <a href="https://www.linkedin.com/in/omercanbalandi/">linkedin.com/in/omercanbalandi</a>
      </li>
      <li>
        <span>@twitter</span>
        <a href="https://twitter.com/obsfx">twitter.com/obsfx</a>
      </li>
    </ul>
  </div>
</section>

<style lang="scss">
  section {
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  .head {
    padding: 0px 32px;

    @media (max-width: 720px) {
      padding: 0px 24px;
    }

    h2 {
      margin-top: 4px;
      color: #6b7177;
      letter-spacing: -0.5px;

      @media (max-width: 720px) {
        font-size: 0.85rem;
      }

      strong {
        color: black;
      }
    }

    h1 {
      width: 100%;

      a {
        font-weight: 700;
        color: #222222;
      }
    }
  }

  .info {
    padding: 24px 32px;

    @media (max-width: 720px) {
      padding: 16px 24px;
    }

    p {
      font-size: 1rem;
      letter-spacing: -0.5px;

      @media (max-width: 720px) {
        font-size: 0.8rem;
      }

      &:not(:last-child) {
        margin-bottom: 18px;
      }

      &.neovim {
        display: flex;
        align-items: center;

        img {
          max-height: 1.2rem;
          margin-left: 7px;

          @media (max-width: 720px) {
            max-height: 0.95rem;
          }
        }
      }

      a {
        color: #000000;
        border-bottom: 1px dashed #ddd;
        text-decoration: none;
        font-weight: 500;

        &:hover {
          border-color: #000000;
        }
      }
    }
  }

  .section {
    padding: 12px 32px;

    @media (max-width: 720px) {
      padding: 16px 24px;
    }

    h2 {
      font-weight: 500;
    }

    ul {
      padding: 0;
      margin: 8px 0px;
      letter-spacing: -0.5px;

      li {
        list-style: none;
        font-weight: normal;
        font-size: 0.8rem;
        font-weight: 500;
        padding: 2px 0px;

        span {
          color: #6b7177;
          min-width: 160px;
          display: inline-block;
          font-weight: normal;
        }

        a {
          color: #000000;
          border-bottom: 1px dashed #ddd;
          text-decoration: none;
          font-weight: 500;

          &:hover {
            border-color: #000000;
          }
        }
      }
    }
  }
</style>
