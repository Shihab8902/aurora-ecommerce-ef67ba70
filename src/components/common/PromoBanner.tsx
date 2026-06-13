import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

interface PromoBannerProps {
  title: string;
  image: string;
  link: string;
}

export function PromoBanner({ title, image, link }: PromoBannerProps) {
  return (
    <section className="py-12 md:py-16 lg:py-[50px]" data-jc-id="B8BX31">
      <div className="container-custom" data-jc-id="B8BWGH">
        <Link to={link} className="block group" data-jc-id="B8BWCY">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative h-[250px] md:h-[400px] rounded-brand overflow-hidden bg-gray-100 shadow-sm"
          data-jc-id="B8BVPY">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover"
            data-jc-id="B8BTFZ"/>
          </motion.div>
        </Link>
      </div>
    </section>
  );
}
