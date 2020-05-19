import { IconBaseProps } from '@ant-design/icons/lib/components/Icon';
import { createFromIconfontCN } from '@ant-design/icons';

interface IconFontProps extends IconBaseProps {
  type: string;
}
/**
 * 使用IconFont字体图标
 */
const IconFont: React.FC<IconFontProps> = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1709014_wl3qyrmbhuo.js'
});

export default IconFont;
