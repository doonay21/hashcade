<input type="text" id="input-1">
<input type="text" id="input-2">
<button onclick="showHash()">Show Hash</button>
<div id="hash_result">

</div>

<script>
	function showHash() {
		let input1 = $('#input-1').val()
		let input2 = $('#input-2').val()

		$('#hash_result').html(input1 + ', ' + input2)
	}
</script>
