import Link from "next/link";

const CustomLink = ({ queryLink, pathname, query, alias, children, index }) => {
	if (queryLink && index) {
		return (
			<Link
				href={{
					pathname,
					query,
				}}
				as={{ pathname: alias ? alias : pathname, query }}
				index={index}
			>
				{children}
			</Link>
		);
	} else if (queryLink) {
		return (
			<Link
				href={{
					pathname,
					query,
				}}
				as={{ pathname: alias ? alias : pathname, query }}
			>
				{children}
			</Link>
		);
	} else if (index) {
		return (
			<Link
				href={pathname}
				as={{ pathname: alias ? alias : pathname }}
				index={index}
			>
				{children}
			</Link>
		);
	} else {
		return (
			<Link href={pathname} as={{ pathname: alias ? alias : pathname }}>
				{children}
			</Link>
		);
	}
};

export default CustomLink;
