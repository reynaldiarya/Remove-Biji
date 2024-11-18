let amount = $state<number | null>(null);

export function getCreditsStore() {
	function setAmount(newAmount: number) {
		amount = newAmount;
	}

	return {
		get amount() {
			return amount;
		},
		setAmount
	};
}
