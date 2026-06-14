import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Leaf } from "lucide-react";

const PageHeader = ({ title, subtitle, image, backUrl, breadcrumbItems = [] }) => {
  return (
    <section className="relative pt-40 pb-20 bg-[#EFECE6] overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[radial-gradient(#1C3B24_1px,transparent_1px)] [background-size:24px_24px]"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col gap-6">
          {/* Breadcrumbs and Back Button */}
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-[#707A72]">
              {backUrl && (
                <Link
                  to={backUrl}
                  className="flex items-center gap-2 hover:text-[#1C3B24] transition-colors"
                >
                  <ArrowLeft size={14} />
                  Back
                </Link>
              )}
              {breadcrumbItems.length > 0 && (
                <>
                  {backUrl && <span className="text-[#D9D3C7]">/</span>}
                  {breadcrumbItems.map((item, index) => (
                    <React.Fragment key={index}>
                      {item.path ? (
                        <Link
                          to={item.path}
                          className="hover:text-[#1C3B24] transition-colors"
                        >
                          {item.label}
                        </Link>
                      ) : (
                        <span className="text-[#1C3B24]">{item.label}</span>
                      )}
                      {index < breadcrumbItems.length - 1 && (
                        <span className="text-[#D9D3C7]">/</span>
                      )}
                    </React.Fragment>
                  ))}
                </>
              )}
            </div>
            <div className="flex items-center gap-2 text-[#D9A036]">
              <Leaf size={12} strokeWidth={1.5} />
              <span className="text-[10px] font-black uppercase tracking-[0.35em]">
                Premium Sattu
              </span>
            </div>
          </div>

          {/* Title Section */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="space-y-4 max-w-3xl">
              {subtitle && (
                <p className="text-xs font-black uppercase tracking-[0.3em] text-[#D9A036]">
                  {subtitle}
                </p>
              )}
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-[#1C2B21] leading-tight tracking-tighter">
                {title}
              </h1>
            </div>

            {/* Decorative Image (if provided) */}
            {image && (
              <div className="w-48 h-48 md:w-64 md:h-64 rounded-3xl overflow-hidden border border-[#D9D3C7] shadow-lg bg-white flex-shrink-0">
                <img
                  src={image}
                  alt={title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PageHeader;
