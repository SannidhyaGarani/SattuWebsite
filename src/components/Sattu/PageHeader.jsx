import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Leaf } from "lucide-react";

const PageHeader = ({ title, subtitle, image, backUrl, breadcrumbItems = [] }) => {
  return (
    <section className="relative pt-40 pb-20 bg-[#FAF4E3] overflow-hidden border-b border-[#E3DBC5]">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/p6-grain.png')] mix-blend-multiply"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col gap-8">
          {/* Breadcrumbs and Heritage Badge */}
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3 text-[10px] font-poppins font-bold uppercase tracking-[0.25em] text-[#605948]/60">
              {backUrl && (
                <Link
                  to={backUrl}
                  className="flex items-center gap-2 hover:text-[#976E2A] transition-colors"
                >
                  <ArrowLeft size={12} />
                  Back
                </Link>
              )}
              {breadcrumbItems.length > 0 && (
                <>
                  {backUrl && <span className="opacity-30">/</span>}
                  {breadcrumbItems.map((item, index) => (
                    <React.Fragment key={index}>
                      {item.path ? (
                        <Link
                          to={item.path}
                          className="hover:text-[#976E2A] transition-colors"
                        >
                          {item.label}
                        </Link>
                      ) : (
                        <span className="text-[#203B23]">{item.label}</span>
                      )}
                      {index < breadcrumbItems.length - 1 && (
                        <span className="opacity-30">/</span>
                      )}
                    </React.Fragment>
                  ))}
                </>
              )}
            </div>
            <div className="flex items-center gap-2 text-[#976E2A]">
               <div className="flex items-center gap-1">
                <Leaf size={12} className="fill-current rotate-45" />
                <div className="w-6 h-[1px] bg-[#976E2A]/30" />
              </div>
              <span className="text-[9px] font-poppins font-bold uppercase tracking-[0.35em]">
                Premium Selection
              </span>
            </div>
          </div>

          {/* Title Section */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="space-y-4 max-w-3xl">
              {subtitle && (
                <p className="text-[10px] font-poppins font-bold uppercase tracking-[0.4em] text-[#976E2A]">
                  {subtitle}
                </p>
              )}
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-poppins font-bold text-[#203B23] leading-tight tracking-tight uppercase">
                {title}
              </h1>
            </div>

            {/* Decorative Image Arched Frame */}
            {image && (
              <div className="w-48 h-48 md:w-64 md:h-64 rounded-t-full rounded-b-2xl overflow-hidden border-[1.5px] border-[#E3DBC5] shadow-2xl bg-[#FFFDF6] p-1.5 flex-shrink-0">
                <div className="w-full h-full rounded-t-full rounded-b-xl overflow-hidden relative">
                  <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-[#203B23]/10" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PageHeader;
