<script>
    import { onMount } from 'svelte';
    import { FeedSdk, InstantRemixing } from '@withkoji/vcc';

    let instantRemixing;
    let title;
    let isRemixing;

    onMount(() => {
        instantRemixing = new InstantRemixing();

        // Set the default value for title and isRemixing state
        isRemixing = instantRemixing.isRemixing;
        title = instantRemixing.get(['settings', 'title']);

        // Set up a listener to update title value
        instantRemixing.onValueChanged((path, newValue) => {
            if (path[0] && path[1] && path[0] === 'settings' && path[1] === 'title') {
            title = newValue;
            }
        });

        // Toggle the isRemixing state based on the listener
        instantRemixing.onSetRemixing((isRemixingTrue) => {
            isRemixing = isRemixingTrue;
        });

        // Alert Koji we are ready to use instantRemixing
        instantRemixing.ready();

        let feed = new FeedSdk();
        feed.load();
    });

    function editText() {
        // Conditionally handle the click, only if the template is being remixed
        if (isRemixing) {
            instantRemixing.onPresentControl(['settings', 'title']);
        }
    };
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

<div class="image" style='background-image: url("https://images.koji-cdn.com/43188147-b060-443f-b76a-9fddd4b93f38/p6a4a-a6471bdde6154e5ab793a13c5dfcd81c.png?optimize=50");'></div>
<h1
  class={isRemixing ? 'remixing' : ''}
  on:click={editText}
>
  {title}
</h1>
