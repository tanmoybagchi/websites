import { SitePages } from 'material-cms';

export class MySitePages implements SitePages {
  // This order is important.
  readonly list: { link: string, name: string, xs?: boolean, sm?: boolean, md?: boolean, lg?: boolean }[] = [
    { link: 'events', name: 'Events', xs: true },
    { link: 'services', name: 'Services', xs: true },
    { link: 'ministries', name: 'Ministries', xs: true },
    { link: 'transportation', name: 'Transportation', xs: true },
    { link: 'pastor', name: 'Pastor', sm: true },
    { link: 'sermon', name: 'Sermon', md: true },
    { link: 'photos', name: 'Photos', md: true },
    { link: 'united-methodist-women', name: 'United Methodist Women', md: true },
    { link: 'vision', name: 'Vision', md: true },
    { link: 'caller', name: 'Caller', lg: true },
    { link: 'staff', name: 'Staff', lg: true },
    { link: 'history', name: 'History', lg: true },
  ];
}