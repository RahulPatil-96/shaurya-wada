import React from 'react';
import { X, Heart, ShoppingCart } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { toast } from "sonner";

const FurnitureDetailModal = ({ item, onClose }) => {
  if (!item) return null;

  const handleFavorite = async () => {
    try {
      // Mock favorite functionality
      toast.success('Added to favorites!');
    } catch (error) {
      toast.error('Please log in to save favorites');
    }
  };

  const handlePurchase = () => {
    if (item.purchaseLink) {
      window.open(item.purchaseLink, '_blank');
    } else {
      toast.info('Purchase link not available');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{item.name}</h2>
            <p className="text-gray-600 mb-4">{item.description}</p>

            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl font-bold text-[#c9a55c]">
                ${item.price}
              </span>
              {item.originalPrice && (
                <span className="text-lg text-gray-500 line-through">
                  ${item.originalPrice}
                </span>
              )}
            </div>

            {item.financing && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                <p className="text-green-800 text-sm font-medium">
                  Financing Available
                </p>
              </div>
            )}
          </div>

          <div className="space-y-3 mb-6">
            <h3 className="font-semibold text-gray-900">Features:</h3>
            <ul className="space-y-2">
              {item.features.map((feature, index) => (
                <li key={index} className="flex items-center text-sm text-gray-600">
                  <div className="w-1.5 h-1.5 bg-[#c9a55c] rounded-full mr-3 shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex gap-3">
            <Button
              onClick={handleFavorite}
              variant="outline"
              className="flex-1"
            >
              <Heart className="w-4 h-4 mr-2" />
              Favorite
            </Button>
            <Button
              onClick={handlePurchase}
              className="flex-1 bg-[#c9a55c] hover:bg-[#b8944b] text-white"
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Purchase
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FurnitureDetailModal;
