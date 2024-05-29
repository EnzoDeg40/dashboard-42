<script lang="ts">
	import { getToastStore, Autocomplete, SlideToggle, popup, type AutocompleteOption, type PopupSettings } from '@skeletonlabs/skeleton';
	const toastStore = getToastStore();

	export let data;

	const popupSettingHover: PopupSettings = {
		event: 'hover',
		target: 'popupSettingHover',
		placement: 'top'
	};

	const popupParamsHover: PopupSettings = {
		event: 'hover',
		target: 'popupParamsHover',
		placement: 'bottom'
	};

	const popupFailHover: PopupSettings = {
		event: 'hover',
		target: 'popupFailHover',
		placement: 'bottom'
	};

	let popupSettings: PopupSettings = {
		event: 'focus-click',
		target: 'popupChannel',
		placement: 'bottom'
	};
	let inputChannelError = false;
	type Option = AutocompleteOption<string>;
	let channels:Option[] = data.channels
	.filter((channel: any) => channel.type === 0)
	.map((channel: any) => ({
		value: channel.id,
		label: channel.name,
	}));
	let Channel = channels.find((channel: Option) => channel.value === data.guild.chanid);
	let inputChannel: string = Channel?.label || '';

	let value2: boolean = data.guild.check_failure;
	let success: string = data.guild.message_success;
	let failure: string = data.guild.message_failure;
	let disabledall = data.guild.check;
	let save = false;

	let selectedChannelId = Channel?.value || "";
	function onPopupDemoSelect(event: CustomEvent<Option>): void {
		inputChannel = event.detail.label;
		selectedChannelId = event.detail.value;
	}

	let textparams = "{here} : mention @here\n{intra} : display the intra name\n{mention} : mention the user\n{mark} : display the mark";


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

<div class="container h-full mx-auto flex justify-center items-center">
	<div class="space-y-10 text-center flex flex-col items-center">
		<div class="card p-4 w-full text-token space-y-4">
			<label class="label">
				<form method="POST">
					<div class="flex justify-between items-center">
						<h2 class="h2">Settings</h2>
						<p use:popup={popupSettingHover}><SlideToggle name="check" bind:checked={disabledall} on:change={() => save = true}/></p>
						<div class="card p-4 variant-filled-secondary" data-popup="popupSettingHover">
							<p>Desactivate the bot for this server</p>
						<div class="arrow variant-filled-secondary" />
					</div>
					</div>
					<hr class="p-4"/>
					<div class="flex space-x-10">
						<div class="w-1/2">
							<span>Message Channel :</span>
							<input
									class="input {inputChannelError? "input-error" : ""} autocomplete p-4 pb-2 pt-2"
									type="search"
									bind:value={inputChannel}
									on:focus={() => inputChannelError = false}
									placeholder="Search Channel..."
									use:popup={popupSettings}
									on:change={() => save = true}
									disabled={!disabledall}
								/>
								<input
									type="hidden"
									name="channel"
									bind:value={selectedChannelId}
								/>
								<div data-popup="popupChannel" class="z-50 card w-full max-w-sm max-h-48 p-4 overflow-y-auto" tabindex="-1">
									<Autocomplete
										bind:input={inputChannel}
										options={channels}
										on:selection={onPopupDemoSelect}
									/>
								</div>
							<p>Message succes :</p>
							<textarea class="textarea p-4 pb-2 pt-2" name="success_message" rows="4" on:change={() => save = true} bind:value={success} disabled={!disabledall} placeholder="Message success..."></textarea>
							<textarea class="textarea p-4 pb-2 pt-2" rows="4" use:popup={popupParamsHover} on:change={() => save = true} bind:value={textparams} disabled={true}></textarea>
							<div class="card p-4 variant-filled-secondary" data-popup="popupParamsHover">
								<p>Parameter that can be put in the message</p>
								<div class="arrow variant-filled-secondary" />
							</div>
						</div>
						<span class="divider-vertical h-30" />
						<div class="w-1/2">
							<div class="flex justify-center items-center gap-[10px]">
								<p>Check failure </p>
								<p use:popup={popupFailHover}><SlideToggle name="failure" bind:checked={value2} on:change={() => save = true} disabled={!disabledall}/></p>
									<div class="z-50 card p-4 variant-filled-secondary" data-popup="popupFailHover">
										<p>Send Message if a user fail a project</p>
										<div class="arrow variant-filled-secondary" />
									</div>
							</div>
							<hr class="m-4"/>
							<p>Message failure :</p>
							<textarea class="textarea p-4 pb-2 pt-2" name="failure_message" rows="4" on:change={() => save = true} bind:value={failure} placeholder="Message failure..." disabled={!value2 || !disabledall}></textarea>
							<div class="p-4"/>
								<button type="submit" class="mt-4 btn variant-filled-primary" disabled={!save}>Save</button>
							<div class="p-4"/>
						</div>
					</div>
				</form>
			</label>
		</div>
	</div>
</div>
