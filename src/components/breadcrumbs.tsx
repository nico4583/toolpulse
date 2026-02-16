import Link from "next/link";

export type Crumb = {
  name: string;
  href: string;
};

export function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 text-sm text-slate-600">
      <ol className="flex flex-wrap items-center gap-2">
        {crumbs.map((crumb, index) => (
          <li key={crumb.href} className="flex items-center gap-2">
            {index > 0 ? <span>/</span> : null}
            {index === crumbs.length - 1 ? (
              <span className="font-medium text-slate-900">{crumb.name}</span>
            ) : (
              <Link href={crumb.href} className="hover:text-slate-900">
                {crumb.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function breadcrumbSchema(crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: `https://moneymentor.tools${crumb.href}`,
    })),
  };
}
