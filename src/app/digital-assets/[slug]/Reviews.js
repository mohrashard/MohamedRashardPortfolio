"use client";

import { useState } from 'react';

export default function ReviewsSection({ reviews: initialReviews }) {
    const [reviews, setReviews] = useState(initialReviews || []);
    const [isWriting, setIsWriting] = useState(false);
    const [newReview, setNewReview] = useState({ rating: 5, content: '', name: '', role: '' });
    const [hasSubmitted, setHasSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate submission
        const review = {
            id: Date.now(),
            user: newReview.name || "Anonymous",
            role: newReview.role || "Verified Buyer",
            rating: newReview.rating,
            date: "Just now",
            content: newReview.content
        };

        setReviews([review, ...reviews]);
        setHasSubmitted(true);
        setIsWriting(false);
    };

    return (
        <section className="mt-24 pt-12 border-t border-white/10" id="reviews">
            <div className="flex items-center justify-between mb-12">
                <div>
                    <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
                        <i className="fas fa-star text-yellow-500"></i> Customer Reviews
                    </h2>
                    <p className="text-slate-400">Trusted by 500+ developers worldwide.</p>
                </div>
                {!hasSubmitted && (
                    <button
                        onClick={() => setIsWriting(!isWriting)}
                        className="px-6 py-2 rounded-xl bg-white/5 border border-white/10 text-white font-semibold hover:bg-purple-600/20 hover:border-purple-500/50 hover:text-purple-400 transition-all"
                    >
                        {isWriting ? 'Cancel' : 'Write a Review'}
                    </button>
                )}
            </div>

            {hasSubmitted && (
                <div className="mb-8 p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 flex items-center gap-3">
                    <i className="fas fa-check-circle"></i>
                    Thank you! Your review has been submitted and is live.
                </div>
            )}

            {isWriting && (
                <form onSubmit={handleSubmit} className="mb-12 p-6 rounded-2xl bg-white/5 border border-white/10 animate-in fade-in slide-in-from-top-4">
                    <h3 className="text-xl font-bold text-white mb-6">Share your experience</h3>

                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Your Name</label>
                            <input
                                required
                                type="text"
                                placeholder="John Doe"
                                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors"
                                value={newReview.name}
                                onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Role (Optional)</label>
                            <input
                                type="text"
                                placeholder="Software Engineer"
                                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors"
                                value={newReview.role}
                                onChange={(e) => setNewReview({ ...newReview, role: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="mb-6">
                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Rating</label>
                        <div className="flex gap-2">
                            {[1, 2, 3, 4, 5].map(star => (
                                <button
                                    key={star}
                                    type="button"
                                    onClick={() => setNewReview({ ...newReview, rating: star })}
                                    className={`text-2xl transition-colors ${star <= newReview.rating ? 'text-yellow-400' : 'text-slate-600 hover:text-yellow-400/50'}`}
                                >
                                    <i className="fas fa-star"></i>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="mb-6">
                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Review</label>
                        <textarea
                            required
                            rows={4}
                            placeholder="Tell us what you liked..."
                            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors resize-none"
                            value={newReview.content}
                            onChange={(e) => setNewReview({ ...newReview, content: e.target.value })}
                        />
                    </div>

                    <button type="submit" className="w-full py-3 rounded-xl bg-purple-600 text-white font-bold hover:bg-purple-500 transition-colors shadow-lg">
                        Submit Review
                    </button>
                </form>
            )}

            <div className="grid md:grid-cols-2 gap-6">
                {reviews.map((review) => (
                    <div key={review.id} className="p-6 rounded-2xl bg-[#0a0a0a] border border-white/5 hover:border-white/10 transition-colors">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold text-sm">
                                    {review.user.charAt(0)}
                                </div>
                                <div>
                                    <h4 className="font-bold text-white text-sm">{review.user}</h4>
                                    <p className="text-xs text-slate-500">{review.role}</p>
                                </div>
                            </div>
                            <div className="text-xs text-slate-500 font-mono">{review.date}</div>
                        </div>
                        <div className="flex text-yellow-500 text-xs mb-3">
                            {[...Array(5)].map((_, i) => (
                                <i key={i} className={`fas fa-star ${i < review.rating ? '' : 'text-slate-700'}`}></i>
                            ))}
                        </div>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            "{review.content}"
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}
