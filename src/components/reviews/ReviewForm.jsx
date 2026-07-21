// import { Star, Send, Check } from "lucide-react";

// export default function ReviewForm({
//   movies,
//   reviewName,
//   setReviewName,
//   reviewMovie,
//   setReviewMovie,
//   reviewRating,
//   setReviewRating,
//   reviewComment,
//   setReviewComment,
//   reviewSubmitted,
//   handleReviewSubmit,
// }) {
//   return (
//     <div className="max-w-xl mx-auto bg-[#161616] border border-[#252525] rounded-2xl p-6 sm:p-8 shadow-xl">
//       <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
//         <Star className="w-4 h-4 text-[#D4AF37]" />
//         Deja tu Crítica Profesional
//       </h3>

//       <p className="text-xs text-[#8E8E8E] mb-6">
//         Tu valoración aporta enormemente a la difusión del cine de autor independiente.
//       </p>

//       <form onSubmit={handleReviewSubmit} className="space-y-4">

//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

//           <div>
//             <label className="block text-xs uppercase tracking-wider text-[#8E8E8E] mb-1 font-mono">
//               Nombre o Seudónimo
//             </label>

//             <input
//               type="text"
//               required
//               value={reviewName}
//               onChange={(e) => setReviewName(e.target.value)}
//               className="w-full bg-[#050505] border border-[#2d2d2d] focus:border-[#9D0208] text-[#F5F5F5] rounded-lg p-2.5 text-xs"
//             />
//           </div>

//           <div>
//             <label className="block text-xs uppercase tracking-wider text-[#8E8E8E] mb-1 font-mono">
//               Obra Audiovisual
//             </label>

//             <select
//               value={reviewMovie}
//               onChange={(e) => setReviewMovie(e.target.value)}
//               required
//               className="w-full bg-[#050505] border border-[#2d2d2d] focus:border-[#9D0208] text-[#F5F5F5] rounded-lg p-2.5 text-xs"
//             >
//               <option value="">Selecciona una producción...</option>
//               {movies.map((m) => (
//                 <option key={m.id} value={m.title}>
//                   {m.title}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>

//         <div>
//           <label className="block text-xs uppercase tracking-wider text-[#8E8E8E] mb-1 font-mono">
//             Valoración
//           </label>

//           <div className="flex gap-2">
//             {[1, 2, 3, 4, 5].map((num) => (
//               <button
//                 type="button"
//                 key={num}
//                 onClick={() => setReviewRating(num)}
//               >
//                 <Star
//                   className={`w-5 h-5 ${
//                     num <= reviewRating
//                       ? "text-[#D4AF37] fill-[#D4AF37]"
//                       : "text-[#333]"
//                   }`}
//                 />
//               </button>
//             ))}
//           </div>
//         </div>

//         <textarea
//           required
//           rows={3}
//           value={reviewComment}
//           onChange={(e) => setReviewComment(e.target.value)}
//           className="w-full bg-[#050505] border border-[#2d2d2d] focus:border-[#9D0208] text-[#F5F5F5] rounded-lg p-2.5 text-xs"
//         />

//         <button
//           type="submit"
//           disabled={reviewSubmitted}
//           className="w-full py-2.5 bg-[#9D0208] text-white text-xs uppercase font-bold rounded-lg"
//         >
//           {reviewSubmitted ? (
//             <>
//               <Check className="w-4 h-4" /> ¡Enviado!
//             </>
//           ) : (
//             <>
//               <Send className="w-4 h-4" /> Publicar Comentario
//             </>
//           )}
//         </button>
//       </form>
//     </div>
//   );
// }