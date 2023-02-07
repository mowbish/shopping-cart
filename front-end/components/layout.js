import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

function Loader() {
	return (
		<div className={styles.loader}>
			<div>
				<img src="../public/images/loading.gif" alt="#" />
			</div>
		</div>
	)
}
function Header() {
	const isLoged = useSelector((store) => store.user.isLoged)
	const [accountButton, setAccountButton] = useState("")

	useEffect(() => {
		isLoged ? setAccountButton("/profile") : setAccountButton("/login")
	}, [isLoged])

	return (
		<>
			<nav className="navbar navbar-expand-lg navbar-light shadow">
				<div className="container d-flex justify-content-between align-items-center">
					<Link href="/">
						<div className="navbar-brand text-success logo h1 align-self-center">Zay</div>
					</Link>

					<button
						className="navbar-toggler border-0"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#templatemo_main_nav"
						aria-controls="navbarSupportedContent"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<span className="navbar-toggler-icon"></span>
					</button>

					<div
						className="align-self-center collapse navbar-collapse flex-fill  d-lg-flex justify-content-lg-between"
						id="templatemo_main_nav"
					>
						<div className="flex-fill">
							<ul className="nav navbar-nav d-flex justify-content-between mx-lg-auto">
								<li className="nav-item">
									<Link href="/">
										<div className="nav-link">Home</div>
									</Link>
								</li>
								<li className="nav-item">
									<Link href="/about">
										<div className="nav-link">About</div>
									</Link>
								</li>
								<li className="nav-item">
									<Link href="/shop">
										<div className="nav-link">Shop</div>
									</Link>
								</li>
								<li className="nav-item">
									<Link href="/contact">
										<div className="nav-link">Contact</div>
									</Link>
								</li>
							</ul>
						</div>
						<div className="navbar align-self-center d-flex">
							<div className="d-lg-none flex-sm-fill mt-3 mb-4 col-7 col-sm-auto pr-3">
								<div className="input-group">
									<input
										type="text"
										className="form-control"
										id="inputMobileSearch"
										placeholder="Search ..."
									/>
									<div className="input-group-text">
										<i className="fa fa-fw fa-search"></i>
									</div>
								</div>
							</div>
							<Link href="#" data-bs-toggle="modal" data-bs-target="#templatemo_search">
								<div className="nav-icon d-none d-lg-inline">
									<i className="fa fa-fw fa-search text-dark mr-2"></i>
								</div>
							</Link>
							<Link href="/">
								<div className="nav-icon position-relative text-decoration-none">
									<i className="fa fa-fw fa-cart-arrow-down text-dark mr-1"></i>
									<span className="position-absolute top-0 left-100 translate-middle badge rounded-pill bg-light text-dark">
										7
									</span>
								</div>
							</Link>
							<Link href={accountButton}>
								<div className="nav-icon position-relative text-decoration-none">
									<i className="fa fa-fw fa-user text-dark mr-3"></i>
									<span className="position-absolute top-0 left-100 translate-middle badge rounded-pill bg-light text-dark">
										+99
									</span>
								</div>
							</Link>
						</div>
					</div>
				</div>
			</nav>
		</>
	)
}
function Modal() {
	return (
		<>
			<div
				className="modal fade bg-white"
				id="templatemo_search"
				tabIndex="-1"
				role="dialog"
				aria-labelledby="exampleModalLabel"
				aria-hidden="true"
			>
				<div className="modal-dialog modal-lg" role="document">
					<div className="w-100 pt-1 mb-5 text-right">
						<button
							type="button"
							className="btn-close"
							data-bs-dismiss="modal"
							aria-label="Close"
						></button>
					</div>
					<form action="" method="get" className="modal-content modal-body border-0 p-0">
						<div className="input-group mb-2">
							<input
								type="text"
								className="form-control"
								id="inputModalSearch"
								name="q"
								placeholder="Search ..."
							/>
							<button type="submit" className="input-group-text bg-success text-light">
								<i className="fa fa-fw fa-search text-white"></i>
							</button>
						</div>
					</form>
				</div>
			</div>
		</>
	)
}

function Footer() {
	return (
		<>
			<footer className="bg-dark" id="tempaltemo_footer">
				<div className="container">
					<div className="row">
						<div className="col-md-4 pt-5">
							<h2 className="h2 text-success border-bottom pb-3 border-light logo">
								Zay Shop
							</h2>
							<ul className="list-unstyled text-light footer-link-list">
								<li>
									<i className="fas fa-map-marker-alt fa-fw"></i>
									123 Consectetur at ligula 10660
								</li>
								<li>
									<i className="fa fa-phone fa-fw"></i>
									<Link href="tel:010-020-0340">
										<div className="text-decoration-none">010-020-0340</div>
									</Link>
								</li>
								<li>
									<i className="fa fa-envelope fa-fw"></i>
									<Link href="mailto:info@company.com">
										<div className="text-decoration-none">info@company.com</div>
									</Link>
								</li>
							</ul>
						</div>

						<div className="col-md-4 pt-5">
							<h2 className="h2 text-light border-bottom pb-3 border-light">Products</h2>
							<ul className="list-unstyled text-light footer-link-list">
								<li>
									<Link href="#">
										<div className="text-decoration-none">Luxury</div>
									</Link>
								</li>
								<li>
									<Link href="#">
										<div className="text-decoration-none">Sport Wear</div>
									</Link>
								</li>
								<li>
									<Link href="#">
										<div className="text-decoration-none">Men's Shoes</div>
									</Link>
								</li>
								<li>
									<Link href="#">
										<div className="text-decoration-none">Women's Shoes</div>
									</Link>
								</li>
								<li>
									<Link href="#">
										<div className="text-decoration-none">Popular Dress</div>
									</Link>
								</li>
								<li>
									<Link href="#">
										<div className="text-decoration-none">Gym Accessories</div>
									</Link>
								</li>
								<li>
									<Link href="#">
										<div className="text-decoration-none">Sport Shoes</div>
									</Link>
								</li>
							</ul>
						</div>

						<div className="col-md-4 pt-5">
							<h2 className="h2 text-light border-bottom pb-3 border-light">
								Further Info
							</h2>
							<ul className="list-unstyled text-light footer-link-list">
								<li>
									<Link href="#">
										<div className="text-decoration-none">Home</div>
									</Link>
								</li>
								<li>
									<Link href="#">
										<div className="text-decoration-none">About Us</div>
									</Link>
								</li>
								<li>
									<Link href="#">
										<div className="text-decoration-none">Shop Locations</div>
									</Link>
								</li>
								<li>
									<Link href="#">
										<div className="text-decoration-none">FAQs</div>
									</Link>
								</li>
								<li>
									<Link href="#">
										<div className="text-decoration-none">Contact</div>
									</Link>
								</li>
							</ul>
						</div>
					</div>

					<div className="row text-light mb-4">
						<div className="col-12 mb-3">
							<div className="w-100 my-3 border-top border-light"></div>
						</div>
						<div className="col-auto me-auto">
							<ul className="list-inline text-left footer-icons">
								<li className="list-inline-item border border-light rounded-circle text-center">
									<a
										className="text-light text-decoration-none"
										target="_blank"
										href="http://facebook.com/"
									>
										<i className="fab fa-facebook-f fa-lg fa-fw"></i>
									</a>
								</li>
								<li className="list-inline-item border border-light rounded-circle text-center">
									<a
										className="text-light text-decoration-none"
										target="_blank"
										href="https://www.instagram.com/"
									>
										<i className="fab fa-instagram fa-lg fa-fw"></i>
									</a>
								</li>
								<li className="list-inline-item border border-light rounded-circle text-center">
									<a
										className="text-light text-decoration-none"
										target="_blank"
										href="https://twitter.com/"
									>
										<i className="fab fa-twitter fa-lg fa-fw"></i>
									</a>
								</li>
								<li className="list-inline-item border border-light rounded-circle text-center">
									<a
										className="text-light text-decoration-none"
										target="_blank"
										href="https://www.linkedin.com/"
									>
										<i className="fab fa-linkedin fa-lg fa-fw"></i>
									</a>
								</li>
							</ul>
						</div>
						<div className="col-auto">
							<label className="sr-only" htmlFor="subscribeEmail">
								Email address
							</label>
							<div className="input-group mb-2">
								<input
									type="text"
									className="form-control bg-dark border-light"
									id="subscribeEmail"
									placeholder="Email address"
								/>
								<div className="input-group-text btn-success text-light">Subscribe</div>
							</div>
						</div>
					</div>
				</div>

				<div className="w-100 bg-black py-3">
					<div className="container">
						<div className="row pt-2">
							<div className="col-12">
								<p className="text-left text-light">
									Copyright &copy; 2023 Company Name | Designed by{" "}
									<a
										rel="sponsored"
										href="https://www.github.com/sadrayavar"
										target="_blank"
									>
										Sadra Yavar
									</a>
								</p>
							</div>
						</div>
					</div>
				</div>
			</footer>
		</>
	)
}

export default function Layout({ children }) {
	return (
		<>
			{/* <Loader/> */}
			<Header />
			<Modal />
			<div style={{ minHeight: "100vh" }}>{children}</div>
			<Footer />

			<script src="/js/jquery-1.11.0.min.js"></script>
			<script src="/js/jquery-migrate-1.2.1.min.js"></script>
			<script src="/js/bootstrap.bundle.min.js"></script>
			<script src="/js/templatemo.js"></script>
			<script src="/js/custom.js"></script>
		</>
	)
}
