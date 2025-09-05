import { Mail, Phone, MapPin, Clock, Shield, Info } from "lucide-react";
import Image from "next/image";
import { LOGO_LINK } from "../../constants/links";

const Footer = () => {
    return (
        <footer className="bg-background border-t border-border/50 mt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Brand Section */}
                    <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                            <Image src={LOGO_LINK?.logo} height={30} width={30} alt={'my Heart Plus Logo'}></Image>

                            <h3 className="text-xl font-bold text-foreground/80">My Heart Plus</h3>
                        </div>
                        <p className="text-muted-foreground text-sm">
                            Your trusted personal health companion, providing comprehensive health monitoring and professional medical guidance.
                        </p>
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                            <Shield className="h-4 w-4" />
                            <span>HIPAA Compliant & Secure</span>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h4 className="font-semibold text-foreground">Quick Links</h4>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Health Dashboard</a></li>
                            <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Health Check</a></li>
                            <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Doctor Consultation</a></li>
                            <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Recommendations</a></li>
                            <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Medical History</a></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-4">
                        <h4 className="font-semibold text-foreground">Contact Information</h4>
                        <div className="space-y-3 text-sm">
                            <div className="flex items-center space-x-3 text-muted-foreground">
                                <Phone className="h-4 w-4" />
                                <span>+1 (555) 123-4567</span>
                            </div>
                            <div className="flex items-center space-x-3 text-muted-foreground">
                                <Mail className="h-4 w-4" />
                                <span>support@MyHeartPlus.com</span>
                            </div>
                            <div className="flex items-center space-x-3 text-muted-foreground">
                                <MapPin className="h-4 w-4" />
                                <span>123 Health St, Medical City, MC 12345</span>
                            </div>
                            <div className="flex items-center space-x-3 text-muted-foreground">
                                <Clock className="h-4 w-4" />
                                <span>24/7 Emergency Support</span>
                            </div>
                        </div>
                    </div>

                    {/* Legal & Support */}
                    <div className="space-y-4">
                        <h4 className="font-semibold text-foreground">Legal & Support</h4>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</a></li>
                            <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Terms of Service</a></li>
                            <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Medical Disclaimer</a></li>
                            <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">FAQ</a></li>
                            <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Help Center</a></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="border-t border-border/50 mt-12 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                            <Info className="h-4 w-4" />
                            <span>This is not a substitute for professional medical advice. Always consult with healthcare providers.</span>
                        </div>
                        <div className="text-sm text-muted-foreground">
                            © 2025 My Heart Plus. All rights reserved.
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;