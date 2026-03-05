import { Button } from '#/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '#/components/ui/card'
import { Input } from '#/components/ui/input'
import { Textarea } from '#/components/ui/textarea'
import { createFileRoute } from '@tanstack/react-router'
import { Mail, MapPin, Phone } from 'lucide-react'

export const Route = createFileRoute('/contact')({
    component: ContactPage,
})

function ContactPage() {
    return <div className="max-w-7xl mx-auto px-6 py-16">

        {/* Page Title */}
        <div className="text-center mb-14">
            <h1 className="text-4xl font-bold mb-3">Contact Us</h1>
            <p className="text-muted-foreground">
                Have questions or want to work with us? We'd love to hear from you.
            </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10">

            {/* Contact Form */}
            <Card className="shadow-lg island-shell rounded-2xl">
                <CardHeader>
                    <CardTitle>Send us a message</CardTitle>
                </CardHeader>

                <CardContent>
                    <form className="space-y-5">

                        <Input placeholder="Your Name" />

                        <Input type="email" placeholder="Your Email" />

                        <Input placeholder="Subject" />

                        <Textarea
                            placeholder="Write your message..."
                            className="min-h-30"
                        />

                        <Button className="w-full">
                            Send Message
                        </Button>

                    </form>
                </CardContent>
            </Card>

            {/* Contact Details */}
            <div className="space-y-6">

                <Card className="shadow-lg island-shell rounded-2xl">
                    <CardContent className="flex items-start gap-4 p-6">
                        <MapPin className="text-primary" size={28} />
                        <div>
                            <h3 className="font-semibold text-lg">Our Address</h3>
                            <p className="text-muted-foreground">
                                Kolkata, West Bengal, India
                            </p>
                        </div>
                    </CardContent>
                </Card>

                <Card className="shadow-lg island-shell rounded-2xl">
                    <CardContent className="flex items-start gap-4 p-6">
                        <Phone className="text-primary" size={28} />
                        <div>
                            <h3 className="font-semibold text-lg">Phone</h3>
                            <p className="text-muted-foreground">
                                +91 9876543210
                            </p>
                        </div>
                    </CardContent>
                </Card>

                <Card className="shadow-lg island-shell rounded-2xl">
                    <CardContent className="flex items-start gap-4 p-6">
                        <Mail className="text-primary" size={28} />
                        <div>
                            <h3 className="font-semibold text-lg">Email</h3>
                            <p className="text-muted-foreground">
                                contact@example.com
                            </p>
                        </div>
                    </CardContent>
                </Card>

            </div>

        </div>

    </div>
}
