<script lang="ts">
	import { getToastStore } from '@skeletonlabs/skeleton';
	import Icon from '@iconify/svelte';
	export let data;

	const toastStore = getToastStore();

	let tableArr = data.users;
	let len = tableArr.length;

	/** @type {import('./$types').ActionData} */
	export let form;

	if (form)
	{
		if (form.success)
		{
			toastStore.trigger({
				message: form.message,
				timeout: 5000,
				hideDismiss: true,
				background: 'variant-filled-success'
			});
		}
		else
		{
			toastStore.trigger({
				message: form.message,
				timeout: 5000,
				hideDismiss: true,
				background: 'variant-filled-error'
			});
		}
	}
</script>

<div class="container h-[92vh] mx-auto flex justify-center overflow-y-scroll">
	<div class="space-y-10 text-center flex flex-col items-center p-[10vh]">
			<h2 class="h2">Users List</h2>
			{#if data.users.length === 0}
				<p>No users found</p>
			{:else}
				<table class="table table-hover">
					<thead>
						<tr>
							<th>Intra</th>
							<th>Discord</th>
							<th>Delete</th>
						</tr>
					</thead>
					<tbody>
						{#each tableArr as row, i}
							<tr>
								<td>{row.intra}</td>
								<td>{row.username}</td>
								<td class="flex justify-center">
									<form method="POST">
										<input
											type="hidden"
											name="user-id"
											value={row.id}
										/>
										<button
											type="submit"
										>
											<Icon icon="twemoji:cross-mark"/>
										</button>
									</form>
								</td>
							</tr>
						{/each}
					</tbody>
					<tfoot>
						<tr>
							<th colspan="2">Total</th>
							<td><code class="code">{len} / 20</code></td>
						</tr>
					</tfoot>
				</table>
			{/if}
	</div>
</div>
