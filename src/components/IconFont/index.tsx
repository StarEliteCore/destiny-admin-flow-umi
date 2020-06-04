import { IconBaseProps } from '@ant-design/icons/lib/components/Icon';
import { IconFontUrl } from '@/configs';
import { createFromIconfontCN } from '@ant-design/icons';

interface IconFontProps extends IconBaseProps {
  type: string;
}

/**
 * 使用IconFont字体图标
 */
const IconFont: React.FC<IconFontProps> = createFromIconfontCN({ scriptUrl: IconFontUrl });

export default IconFont;
