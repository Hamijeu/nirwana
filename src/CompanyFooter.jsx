import React from 'react';
import {ArrowUpRight} from 'lucide-react';

export default function CompanyFooter({Link}) {
  return <footer className="company-profile-footer company-footer-compact"><div className="public-container">
    <small>© 2026 PT Nirwana Akses Teknologi</small><Link to="/portal">Portal layanan <ArrowUpRight size={15}/></Link>
  </div></footer>;
}
