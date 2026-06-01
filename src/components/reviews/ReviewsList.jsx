import { Star } from "lucide-react";

export default function ReviewsList({ reviews }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
      {reviews.map((rev) => (
        <div
          key={rev.id}
          className="bg-[#161616]/40 border border-[#222] hover:border-[#9D0208]/40 transition-all p-6 rounded-xl flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3.5 h-3.5 ${
                    i < rev.rating
                      ? "text-[#D4AF37] fill-[#D4AF37]"
                      : "text-[#333]"
                  }`}
                />
              ))}
            </div>

            <p className="text-sm italic text-[#8E8E8E] mb-6 leading-relaxed">
              "{rev.comment}"
            </p>
          </div>

          <div className="flex items-center justify-between border-t border-[#222]/50 pt-4 mt-auto">
            <span className="text-xs text-white font-medium">
              {rev.user}
            </span>

            <span className="text-[10px] text-[#8E8E8E] font-mono uppercase tracking-widest">
              {rev.movie}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}