<script>
    import { onMount } from 'svelte';
    import { FeedSdk, InstantRemixing } from '@withkoji/vcc';

    let instantRemixing;
    let feed;
    let isPlaying = false;

    let isRemixing;

    let image;
    let titleOptions = {title:'', fontSize:10};

    function editImage()
    {
      // This function calls Koji VCC editor to open for 'settings.logo'
      instantRemixing.onPresentControl(['settings', 'logo']);
    }

    function editText()
    {
    // This function calls Koji VCC editor to open for 'settings.titleOptions'
    if (isRemixing) {
      instantRemixing.onPresentControl(['settings', 'titleOptions']);
    }
    }

    function optimizeURL(url)
    {
    url += '?fit=bounds&width=${window.innerWidth/2}&height=${window.innerHeight/2}&optimize=medium';
    return url;
    }

    onMount(() => {
      instantRemixing = new InstantRemixing();

      // Getting the current value for image and title
      image = instantRemixing.get(['settings', 'logo']);
      titleOptions = instantRemixing.get(['settings', 'titleOptions']);

      // Function which gets called when the VCC values change.
      instantRemixing.onValueChanged((path, newValue) => {
      if (path[0] && path[1])
      {
      if (path[0] === 'settings' && path[1] === 'titleOptions')
      {
      titleOptions = newValue;
      }
      if (path[0] === 'settings' && path[1] === 'logo')
      {
      image = newValue;
      }
      }
      });

      instantRemixing.onSetRemixing((isRemixingTrue) => {
      // Checks if the Remix View
      isRemixing = isRemixingTrue;
      });

      // Alert Koji we are ready to use instantRemixing
      instantRemixing.ready();

      feed = new FeedSdk();
      feed.load();
      feed.onPlaybackStateChanged((isPlayingTrue) => {
        isPlaying = isPlayingTrue;
      });
    });
</script>

<style>
  .remixing {
    background-color: rgba(255, 255, 255, 0.4);
    padding: 18px;
    border-width: 1px;
    border-style: solid;
    border-color: rgb(255, 255, 255);
    border-image: initial;
    border-radius: 4px;
  }
</style>

{#if isPlaying}
  <div class="image animate-example" style="background-image: url('{optimizeURL(image)}');"></div>
	<h1 style='font-size: {titleOptions.fontSize}px'>{titleOptions.title}</h1>
{:else}
  <div class={isRemixing ? 'image remixing' : 'image'}
  on:click={editImage}
  style="background-image: url('{optimizeURL(image)}');"></div>
  <h1 class={isRemixing ? 'remixing' : ''}
  style='font-size: {titleOptions.fontSize}px'
  on:click={editText} >
  {titleOptions.title}</h1>
{/if}
