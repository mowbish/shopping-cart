import Inpute from "./input"

export default function Address({ data, key }) {
	return (
		<address key={`uniqueAddress-${key}`}>
			<h4>
				<p style={{ display: "inline" }}>address name: </p>
				<input placeholder="address_name" name="address_name" value={data.address_name} readOnly></input>
			</h4>
			<h4>
				<p style={{ display: "inline" }}>country: </p>
				<input placeholder="country" name="country" value={data.country} readOnly></input>
			</h4>
			<h4>
				<p style={{ display: "inline" }}>state: </p>
				<input placeholder="state" name="state" value={data.state} readOnly></input>
			</h4>
			<h4>
				<p style={{ display: "inline" }}>city: </p>
				<input placeholder="city" name="city" value={data.city} readOnly></input>
			</h4>
			<h4>
				<p style={{ display: "inline" }}>postal code: </p>
				<input placeholder="postal_code" name="postal_code" value={data.postal_code} readOnly></input>
			</h4>
			<h4>
				<p style={{ display: "inline" }}>detail: </p>
				<input placeholder="address_detail" name="address_detail" value={data.address_detail} readOnly></input>
			</h4>
		</address>
	)
}
