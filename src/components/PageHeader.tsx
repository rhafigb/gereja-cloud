interface PageHeaderProps {
  title: string;
  subtitle: string;
  bgImage?: string;
}

export default function PageHeader({ title, subtitle, bgImage }: PageHeaderProps) {
  return (
    <div className="relative h-[40vh] flex items-center justify-center text-center text-white">
        {/* Background Image dengan Overlay */}
        <div 
            className="absolute inset-0 bg-cover bg-center z-0"
            style={{ 
                backgroundImage: `linear-gradient(rgba(30, 58, 138, 0.9), rgba(30, 58, 138, 0.8)), url('${bgImage || "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"}')`
            }}
        ></div>
        
        <div className="relative z-10 container mx-auto px-6 mt-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
            <div className="w-20 h-1 bg-accent mx-auto mb-4"></div>
            <p className="text-blue-100 text-lg max-w-2xl mx-auto">{subtitle}</p>
        </div>
    </div>
  );
}