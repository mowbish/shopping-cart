import Input from "../../misc/input"

export default function Address({ addAddressHandler, addressUi }) {
	return (
		<>
			<form>
				{["address_name", "country", "state", "city", "address_detail", "postal_code"].map((key) => (
					<>
						<Input label={key} name={key} placeHolder={key} required={key === "country" && false} />
						<br />
					</>
				))}
				<button type="submit" onClick={addAddressHandler}>
					add address
				</button>
			</form>
            
			{addressUi}
		</>
	)
}
